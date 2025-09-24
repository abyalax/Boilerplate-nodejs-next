export const navigationRoot = [
  { name: 'Home', href: '/' },
  { name: 'Order', href: '/order' },
  { name: 'Pricing', href: '/pricing' },
];

export const navigationClientAdmin = (clientId: string) => [{ name: 'Customers', href: `/${clientId}/admin/customers` }];

export const navigationClient = (clientId: string) => [
  { name: 'Customers', href: `/${clientId}/admin` },
  { name: 'Customer', href: `/${clientId}/customer` },
  { name: 'Login', href: `/${clientId}/auth/login` },
  { name: 'Register', href: `/${clientId}/auth/register` },
];

export const navigationAdmin = [
  { name: 'Home', href: '/backoffice' },
  { name: 'Clients', href: '/backoffice/clients' },
  { name: 'Create Client', href: '/clients/create' },
];

export const navigationCustomer = (clientId: string) => [
  { name: 'Home', href: `/${clientId}/customer` },
  { name: 'Profile', href: `/${clientId}/customer/me/profile` },
  { name: 'Order', href: `/${clientId}/customer/orders` },
];

export const navigationGuest = [
  { name: 'Home', href: '/' },
  { name: 'Order', href: '/order' },
  { name: 'Pricing', href: '/pricing' },

  /**Just For Development */
  { name: 'Customer', href: '/1/customer' },
  { name: 'Client Admin', href: '/1/admin' },
  { name: 'System Admin', href: '/backoffice' },
];
