import { roles, permissions, rolePermissions, users, userRoles } from './schema';
import * as bcrypt from 'bcrypt';
import { db } from '.';

async function main() {
  console.log('Starting RBAC seeder...');

  // 1. Insert Roles
  console.log('📝 Inserting roles...');
  const rolesData = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
  ];

  await db.insert(roles).values(rolesData);

  // 2. Insert Permissions
  console.log('🔐 Inserting permissions...');
  const permissionsData = [
    { id: 1, key: 'create:user', name: 'Create User' },
    { id: 2, key: 'update:user', name: 'Update User' },
    { id: 3, key: 'delete:user', name: 'Delete User' },
    { id: 4, key: 'read:user', name: 'Read User' },
  ];

  await db.insert(permissions).values(permissionsData);

  // 3. Assign Permissions to Admin Role
  console.log('🔗 Assigning permissions to Admin role...');
  const adminPermissions = [
    { roleId: 1, permissionId: 1 }, // create:user
    { roleId: 1, permissionId: 2 }, // update:user
    { roleId: 1, permissionId: 3 }, // delete:user
    { roleId: 1, permissionId: 4 }, // read:user
  ];

  await db.insert(rolePermissions).values(adminPermissions);

  // 4. Insert Sample Users
  console.log('👥 Inserting sample users...');
  const hashedPassword = bcrypt.hashSync('password', 10);
  const usersData = [
    {
      id: 1,
      name: 'John Admin',
      password: hashedPassword,
      email: 'john@gmail.com',
    },
    {
      id: 2,
      name: 'Jane User',
      password: hashedPassword,
      email: 'jane@gmail.com',
    },
  ];

  await db.insert(users).values(usersData);

  // 5. Assign Roles to Users
  console.log('👤 Assigning roles to users...');
  const userRoleAssignments = [
    { userId: 1, roleId: 1 }, // John -> Admin
    { userId: 2, roleId: 2 }, // Jane -> User
  ];

  await db.insert(userRoles).values(userRoleAssignments);

  console.log('✅ RBAC seeder completed successfully!');
  console.log(`
📊 Summary:
- Roles: Admin (full permissions), User (no permissions)
- Permissions: create:user, update:user, delete:user, read:user
- Users: John (Admin), Jane (User)
  `);
}

main()
  .then(() => {
    console.log('🎉 Seeder finished');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seeder failed:', err);
    process.exit(1);
  });
