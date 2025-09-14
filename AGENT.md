Platform ini menggunakan konsep multi-tenant di mana setiap toko (client) memiliki ruang terisolasi untuk mengelola aplikasi POS mereka sendiri, termasuk produk, customer, dan transaksi. Tenant diidentifikasi dengan parameter clientId pada URL sehingga seluruh rute aplikasi, baik untuk admin toko maupun customer, selalu berada dalam scope client tertentu. Struktur routing dipisahkan menjadi tiga lapisan utama: public routes untuk landing, pricing, dan order setup; tenant routes yang terbagi menjadi admin (/[clientId]/admin/...) untuk mengelola data toko dan customer (/[clientId]/me/... atau /[clientId]/orders/...) untuk aktivitas pengguna akhir; serta backoffice routes (/backoffice/...) untuk super admin yang mengawasi seluruh tenant. Dengan pola ini, data dan akses setiap tenant tetap terisolasi namun dapat dikelola secara terpusat.

```ts
const pathnames = [
  // Public
  '/', // landing page
  '/pricing', // pricing
  '/order', // order POS app (request setup)

  // Auth
  '/admin/auth/login', // login client admin
  '/admin/auth/register', // register client admin

  '/[clientId]/auth/login', // login customer toko tertentu
  '/[clientId]/auth/register', // register customer toko tertentu

  // Customer (scoped by clientId)
  '/[clientId]/me/profile', // profile view
  '/[clientId]/me/profile/edit', // update profile

  '/[clientId]/orders', // list orders
  '/[clientId]/orders/[orderId]', // detail order

  // Client Admin (tenant side)
  '/[clientId]/admin', // dashboard
  '/[clientId]/admin/customers', // list customers
  '/[clientId]/admin/customers/new', // create customer
  '/[clientId]/admin/customers/[customerId]', // detail customer
  '/[clientId]/admin/customers/[customerId]/edit', // update customer

  // Backoffice (super admin)
  '/backoffice',
  '/backoffice/clients',
  '/backoffice/clients/new', // create client
  '/backoffice/clients/[clientId]', // detail client
  '/backoffice/clients/[clientId]/edit', // update client
  '/backoffice/clients/[clientId]/customers',
  '/backoffice/clients/[clientId]/customers/[customerId]',
  '/backoffice/clients/[clientId]/customers/[customerId]/edit',
];
```
