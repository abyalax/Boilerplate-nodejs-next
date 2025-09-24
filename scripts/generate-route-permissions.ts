import fs from 'node:fs';
import path from 'node:path';
import chokidar from 'chokidar';
import { glob } from 'glob';

async function generateRoutePermissions() {
  const basePermissions: Record<string, string[]> = {};
  const hierarchicalPermissions: Record<string, string[]> = {};

  const pageFiles = await glob('**/page.{ts,tsx}', {
    cwd: path.join(process.cwd(), 'app'),
    ignore: ['**/node_modules/**', '**/.next/**'],
  });

  const routeFiles = await glob('**/route.{ts,tsx}', {
    cwd: path.join(process.cwd(), 'app'),
    ignore: ['**/node_modules/**', '**/.next/**'],
  });

  const allFiles = [...pageFiles, ...routeFiles];
  console.log(`Found ${pageFiles.length} page files and ${routeFiles.length} route files`);
  // Step 1: Collect base permissions from files
  for (const relativeFile of allFiles) {
    const absolutePath = path.join(process.cwd(), 'app', relativeFile);

    try {
      delete require.cache[require.resolve(absolutePath)];
      const mod = await import(`${absolutePath}?update=${Date.now()}`);
      const parsed = relativeFile.replace(/(\/)?(page|route)\.(ts|tsx)$/, '');
      const routePath = parsed === '' ? '/' : `/${parsed}`;

      if (mod.permissions) {
        basePermissions[routePath] = mod.permissions;
      } else {
        basePermissions[routePath] = [];
        console.log(`⚠️  No permissions found in ${relativeFile}`);
      }
    } catch (e) {
      console.error(`❌ Error processing ${relativeFile}:`, (e as Error).message);
    }
  }
  // Step 2: Generate all possible route patterns including dynamic routes
  const allRoutes = new Set<string>();
  // Add base routes
  Object.keys(basePermissions).forEach((route) => {
    allRoutes.add(route);
  });
  // Generate dynamic route patterns
  Object.keys(basePermissions).forEach((route) => {
    const segments = route.split('/').filter(Boolean);
    // Generate all possible paths up to this route
    for (let i = 1; i <= segments.length; i++) {
      const partialPath = `/${segments.slice(0, i).join('/')}`;
      allRoutes.add(partialPath);
    }
    // Handle dynamic segments - create matcher patterns
    if (route.includes('[')) {
      // Convert [id] to :id pattern for matching
      const dynamicPattern = route
        .replace(/\[\.\.\.([^\]]+)\]/g, '*') // [...slug] -> *
        .replace(/\[([^\]]+)\]/g, ':$1'); // [id] -> :id

      allRoutes.add(dynamicPattern);
    }
  });
  // Step 3: Apply hierarchical permission collection (compile-time getRequiredPermissions)
  for (const routePath of allRoutes) {
    const collected: string[] = [];
    if (routePath === '/') {
      // Root route
      if (basePermissions['/']) collected.push(...basePermissions['/']);
    } else {
      const segments = routePath.split('/').filter(Boolean);
      // Collect permissions from root and all parent paths
      for (let i = 0; i <= segments.length; i++) {
        const candidate = i === 0 ? '/' : `/${segments.slice(0, i).join('/')}`;
        // Direct match
        if (basePermissions[candidate]) collected.push(...basePermissions[candidate]);
        // Dynamic route matching
        Object.keys(basePermissions).forEach((baseRoute) => {
          if (baseRoute.includes('[') && matchesDynamicRoute(candidate, baseRoute)) {
            collected.push(...basePermissions[baseRoute]);
          }
        });
      }
    }
    // Include All unique routes permissions, even empty array []
    hierarchicalPermissions[routePath] = [...new Set(collected)];
  }

  // Step 4: Generate output with both base and hierarchical permissions
  const outputPath = path.join(process.cwd(), 'lib', 'routes', 'permissions.ts');
  const outputContent = `
// Auto-generated file - do not edit manually
// Generated at: ${new Date().toISOString()}

// Hierarchical permissions (includes parent route permissions)
export const routePermissions: Record<string, string[]> = ${JSON.stringify(hierarchicalPermissions, null, 2)} as const;
`;

  const libDir = path.dirname(outputPath);
  if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });
  fs.writeFileSync(outputPath, outputContent);

  console.log('Generated base permissions:', Object.keys(basePermissions).length);
  console.log('Generated hierarchical permissions:', Object.keys(hierarchicalPermissions).length);
  console.log('✅ Route permissions generated successfully');

  return { basePermissions, hierarchicalPermissions };
}

// Helper function for dynamic route matching during generation
function matchesDynamicRoute(pathname: string, routePattern: string): boolean {
  const pathSegments = pathname.split('/').filter(Boolean);
  const routeSegments = routePattern.split('/').filter(Boolean);
  // kalau routePattern dynamic tapi pathSegmentnya juga static → jangan cocokkan
  if (routeSegments.some((seg) => seg.includes('[')) && pathSegments.every((seg) => /^[a-z0-9_-]+$/.test(seg))) {
    return false;
  }
  // Catch-all
  if (routePattern.includes('[...')) {
    const beforeCatchAll = routeSegments.findIndex((seg) => seg.includes('[...'));
    const staticParts = routeSegments.slice(0, beforeCatchAll);
    return pathSegments.length >= staticParts.length && staticParts.every((seg, i) => seg.includes('[') || seg === pathSegments[i]);
  }

  if (pathSegments.length !== routeSegments.length) return false;
  return routeSegments.every((seg, i) => seg.includes('[') || seg === pathSegments[i]);
}

export function watchForChanges(): void {
  const appDir = path.join(process.cwd(), 'app');
  const DebounceTime = 1000;
  let timeout: NodeJS.Timeout | null = null;
  const debouncedRegenerate = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(async () => {
      console.log('🔃 Regenerating route permissions...');
      await generateRoutePermissions();
    }, DebounceTime);
  };
  const watcher = chokidar.watch(appDir, {
    ignored: /node_modules|(^|\/)\.[^/]+/, // ignore folder yang berat dan hidden
    persistent: true,
    ignoreInitial: true, // jangan trigger event saat start
  });
  watcher.on('all', (event, filePath) => {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      if (filePath.includes('page.') || filePath.includes('route.')) {
        console.log(`🔔 ${event} detected: ${filePath}`);
        debouncedRegenerate();
      }
    }
  });

  watcher.on('error', (error) => {
    console.error('❌ Watcher error:', error);
  });

  const stopWatcher = () => {
    console.log('\n🛑 Stopping watcher...');
    if (timeout) clearTimeout(timeout);
    watcher.close();
    process.exit(0);
  };

  process.on('SIGINT', stopWatcher);
  process.on('SIGTERM', stopWatcher);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--watch')) {
    await generateRoutePermissions();
    watchForChanges();
  } else {
    await generateRoutePermissions();
    process.exit(0);
  }
}

if (require.main === module) main().catch(console.error);
