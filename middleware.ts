import { routePermissions } from './lib/routes/permissions';
import { NextRequest, NextResponse } from 'next/server';
import { env } from './common/const/credential';
import { Permission } from '~/db/schema';
import { getToken } from 'next-auth/jwt';

const publicRoutes = ['/', '/auth/register', '/auth/login'];

function getRequiredPermissions(pathname: string): string[] {
  if (routePermissions[pathname]) return routePermissions[pathname];
  for (const [pattern, permissions] of Object.entries(routePermissions)) {
    if (pattern.includes(':') || pattern.includes('*')) {
      if (matchesPattern(pathname, pattern)) return permissions;
    }
  }
  return [];
}

function matchesPattern(pathname: string, pattern: string): boolean {
  const pathSegments = pathname.split('/').filter(Boolean);
  const patternSegments = pattern.split('/').filter(Boolean);
  if (pattern.endsWith('*')) {
    // Catch-all route [...slug]
    const basePattern = patternSegments.slice(0, -1);
    return pathSegments.length >= basePattern.length && basePattern.every((seg, i) => seg.startsWith(':') || seg === pathSegments[i]);
  }
  if (pathSegments.length !== patternSegments.length) return false;
  return patternSegments.every((seg, i) => seg.startsWith(':') || seg === pathSegments[i]);
}

function matchPermission(userPermissions: string[], required: string): boolean {
  return userPermissions.some((p) => {
    if (p === required) return true; // exact match
    if (p.endsWith('*')) {
      const prefix = p.replace('*', ''); // wildcard
      return required.startsWith(prefix);
    }
    return false;
  });
}

export async function middleware(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    if (publicRoutes.includes(pathname)) return NextResponse.next();
    const token = await getToken({ req, secret: env.JWT_SECRET });
    const userPermissions: string[] = token?.permissions?.map((p: Permission) => p.key) || [];
    const requiredPermissions = getRequiredPermissions(pathname);
    const method = req.method;
    console.log(` ${method} ${pathname} 🔑 Required permissions: `, requiredPermissions);
    const hasPermission = requiredPermissions.every((p) => matchPermission(userPermissions, p));
    console.log(`🛡️  pass middleware: `, hasPermission);
    if (!hasPermission) return NextResponse.redirect(new URL('/auth/login', req.url));
    return NextResponse.next();
  } catch (error) {
    console.dir((error as Error).message);
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

export const config = {
  matcher: [
    // Protect semua API routes
    '/api/:path*',
    // Match semua route kecuali:
    // - Next.js static & image
    // - favicon
    // - login
    // - icon
    // - dot-files (/.well-known, .htaccess, dsb)
    // - files dengan extension (.js, .css, .png, .jpg, .svg, dll)
    '/((?!_next/static|_next/image|favicon.ico|icon|\\..+|.+\\..+).*)',
  ],
};
