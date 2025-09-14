export const navigationRoot = [
  { name: 'Home', href: '/' },
  { name: 'Order', href: '/order' },
  { name: 'Pricing', href: '/pricing' },
];

export const navigationClient = (clientId: string) => [{ name: 'Customers', href: `/${clientId}/admin/customers` }];

export const navigationAdmin = [
  { name: 'Home', href: '/' },
  { name: 'Order', href: '/order' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Backoffice', href: '/backoffice' },
];

export const navigationCustomer = (clientId: string) => [
  { name: 'Profile', href: `/${clientId}/customer/me/profile` },
  { name: 'Order', href: `/${clientId}/customer/orders` },
];

export const navigationGuest = [
  { name: 'Home', href: '/' },
  { name: 'Order', href: '/order' },
  { name: 'Pricing', href: '/pricing' },
];
