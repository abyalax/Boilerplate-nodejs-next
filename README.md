# Boilerplate NextJS Project

## Prerequisites

- Node.js >= 22
- PNPM >= 10.15.1
- Docker and Docker Compose

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Docker Services

```bash
docker compose -f docker-compose.yaml up
```

### 3. Database Setup

Run these commands in sequence:

```bash
# Generate database schema
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Seed the database with initial data
pnpm db:seed

```

### 4. Start Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate database schema
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed the database with initial data
- `pnpm db:studio` - Database Studio to manage data
- `pnpm db:truncate --help` - Show help
- `pnpm db:truncate` - Clear all data (keeps structure)
- `pnpm db:truncate user_roles` - Clear specific tables example users and user_roles
- `pnpm db:drop` - Drop all tables
- `pnpm db:drop roles permissions` - Drop specific tables example roles and permissions
- `pnpm db:drop -- help` - Show help

## How RBAC Works

RBAC di proyek ini berbasis NextAuth (JWT) + middleware App Router:

- **Token berisi roles & permissions**
  Saat login, JWT di inject `roles` dan `permissions` user dari database.
- **Deklarasi izin per route**:

  Setiap file `app/**/page.tsx` atau `app/**/route.ts` bisa mengekspor

  ```ts
  export const permissions = [PERMISSIONS.CUSTOMER.READ, ...]`.
  ```

- **Auto-generate path permissions**:

  Script `permissions:generate` membaca deklarasi tersebut dan membuat file `lib/routes/permissions.ts` (jangan diedit manual).

- **Enforcement di Middleware**:

  `middleware.ts` membaca path permissions dan memblokir akses jika user tidak memiliki semua permission yang dibutuhkan untuk path tersebut (mendukung route dinamis seperti `[id]` → `:id` dan catch-all `*`).

- **Guard ekstra di API**:

  Untuk response JSON 403 yang konsisten, gunakan `safeHandler(handler, ["permission"])` di masing-masing handler API.

### How To Use

1. Seed & jalankan dev

   ```bash
   pnpm db:seed
   pnpm dev
   ```

   Dev script otomatis menjalankan watcher `permissions:watch` yang akan regenerate `lib/routes/permissions.ts` ketika export array `permissions` di route/page.

2. Tambahkan izin pada halaman (Page Route)

   ```ts
   // app/admin/page.tsx
   export const permissions = [PERMISSIONS.CUSTOMER.READ, PERMISSIONS.CUSTOMER.UPDATE ]`. // halaman ini butuh keduanya

   export default function Page() {
   return <div>Admin</div>;
   }
   ```

3. Tambahkan izin pada API (Route Handler)

```ts
// app/api/users/route.ts
import { NextResponse } from "next/server";
import { safeHandler } from "~/lib/handler/safe-handler";

// example guard permissions, but does'nt support per method security
// all handler will be protected to this permission
export const permissions = [
  PERMISSIONS.CUSTOMER.READ,
  PERMISSIONS.CUSTOMER.UPDATE,
];

export const GET = safeHandler(async () => {
  const data = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users);
  return NextResponse.json({ message: "Success Get Data User", data: data });
  // return 403 if doesn't have this permission
}, ["something:permission"]);
```

4. Atur public route (opsional)

Secara default, `middleware.ts` mengizinkan akses tanpa login ke:

```ts
const publicRoutes = ["/", "/auth/register", "/auth/login"];
```

Tambahkan path lain ke `publicRoutes` di `middleware.ts` jika dibutuhkan.

### Catatan Penting

- File `lib/routes/permissions.ts` adalah hasil generate. Jangan edit manual.
- Build production otomatis menjalankan generate: `pnpm build` → `pnpm permissions:generate` + `next build`.
- Route dinamis seperti `/admin/users/[id]` akan di-match sebagai `/admin/users/:id` oleh middleware.
- Jika user tidak punya izin:
  - Pada halaman/API yang dilindungi middleware: akan di-redirect ke `/auth/login`.
  - Dengan `safeHandler`: handler dapat mengembalikan `403` JSON secara eksplisit.
