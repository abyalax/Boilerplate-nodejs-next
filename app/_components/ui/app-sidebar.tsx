'use client';

import { BoxIcon, ChevronRight, HelpCircle, Home, Inbox, LogOut, Notebook, Settings, UserCircle, Users } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ComponentType, SVGProps, useMemo, useState } from 'react';

import { PERMISSIONS } from '~/common/const/permission';
import { usePermissions } from '~/components/hooks/use-permissions';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '~/components/ui/sidebar';
import { cn } from '~/lib/utils';

export interface MenuItem {
  title: string;
  url: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: {
    count: number;
    variant: 'default' | 'destructive' | 'secondary' | 'outline';
  };
  submenu?: MenuItem[];
  permissions: string[];
}

export interface MenuGroup {
  group: string;
  items: MenuItem[];
}

const navigationItems = (clientId: string): MenuGroup[] => [
  {
    group: 'Customer',
    items: [
      {
        title: 'Beranda',
        url: `/${clientId}/customer`,
        icon: Home,
        permissions: [PERMISSIONS.CUSTOMER.READ_PROFILE],
      },
      {
        title: 'Orders',
        url: `/${clientId}/customer/orders`,
        icon: BoxIcon,
        permissions: [PERMISSIONS.CUSTOMER.READ_ORDER],
      },
      {
        title: 'Profile',
        url: `/${clientId}/customer/me/profile`,
        icon: UserCircle,
        permissions: [PERMISSIONS.CUSTOMER.READ_PROFILE],
      },
    ],
  },
  {
    group: 'Client Admin',
    items: [
      {
        title: 'Beranda',
        url: `/${clientId}`,
        icon: Home,
        permissions: [PERMISSIONS.CLIENT.READ],
      },
      {
        title: 'Customer',
        url: `/${clientId}/customer`,
        icon: Users,
        permissions: [PERMISSIONS.CLIENT.READ],
      },
      {
        title: 'Orders',
        url: `/${clientId}/customer/orders`,
        icon: BoxIcon,
        permissions: [PERMISSIONS.CLIENT.READ],
      },
      {
        title: 'Profile',
        url: `/${clientId}/customer/me/profile`,
        icon: UserCircle,
        permissions: [PERMISSIONS.CLIENT.READ],
      },
      {
        title: 'Admin Customers',
        url: `/${clientId}/admin/customers`,
        icon: Inbox,
        permissions: [PERMISSIONS.CLIENT.READ],
      },
      {
        title: 'Admin',
        url: `/${clientId}/admin`,
        icon: Notebook,
        permissions: [PERMISSIONS.CLIENT.READ],
      },
    ],
  },
  {
    group: 'System Admin',
    items: [
      {
        title: 'Beranda',
        url: '/backoffice',
        icon: Home,
        permissions: [PERMISSIONS.CLIENT.READ],
      },
      {
        title: 'Clients',
        url: '/backoffice',
        icon: Users,
        permissions: [PERMISSIONS.CLIENT.READ],
      },
    ],
  },
];

const bottomItems = [
  {
    title: 'Help & Support',
    url: '/help',
    icon: HelpCircle,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

interface AppSidebarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  appName?: string;
  appLogo?: string;
}

export function AppSidebar({ user = { name: 'John Doe', email: 'john@example.com' } }: AppSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { state } = useSidebar();
  const { clientId } = useParams<{ clientId: string }>();
  const pathname = usePathname();
  const { data } = useSession();
  const userPermission = data?.user?.permissions?.map((e) => e.key);
  const permissions = usePermissions(userPermission);
  const navigations = navigationItems(clientId);

  // Memoize the filtered navigation items based on permissions
  const filteredNavigations = useMemo(() => {
    if (!permissions) return [];

    return navigations
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.permissions && permissions.checkPermissions(item.permissions)),
      }))
      .filter((section) => section.items.length > 0);
  }, [navigations, permissions]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]));
  };
  const isActive = (url: string) => pathname === url;
  const isParentActive = (submenu?: Array<{ url: string }>) => submenu?.some((item) => pathname === item.url);

  return (
    <Sidebar className="border-r border-border/40" collapsible="icon">
      {/* Header with branding */}
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-3">
          {state !== 'collapsed' && (
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm truncate">Next Boilerplate</span>
              <span className="text-xs text-muted-foreground">v1.0.0</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        {/* Main Navigation Groups */}
        {filteredNavigations.map((section) => (
          <SidebarGroup key={section.group}>
            <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">{section.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const hasSubmenu = item.submenu && item.submenu.length > 0;
                  const isExpanded = expandedItems.includes(item.title);
                  const itemIsActive = isActive(item.url) || (hasSubmenu && isParentActive(item.submenu));
                  // Permission checking is now handled at the navigation filtering level

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild={!hasSubmenu}
                        className={cn(
                          'w-full justify-start px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors',
                          itemIsActive && 'bg-accent text-accent-foreground font-medium',
                        )}
                        onClick={hasSubmenu ? () => toggleExpanded(item.title) : undefined}
                      >
                        {hasSubmenu ? (
                          <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {item.icon && <item.icon className="w-4 h-4" />}
                              <span>{item.title}</span>
                              {item.badge && (
                                <Badge variant={item.badge.variant} className="ml-auto text-xs px-1.5 py-0.5 h-5">
                                  {item.badge.count}
                                </Badge>
                              )}
                            </div>
                            <ChevronRight className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-90')} />
                          </div>
                        ) : (
                          <Link href={item.url} className="flex items-center gap-3 w-full">
                            {item.icon && <item.icon className="w-4 h-4" />}
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge variant={item.badge.variant} className="ml-auto text-xs px-1.5 py-0.5 h-5">
                                {item.badge.count}
                              </Badge>
                            )}
                          </Link>
                        )}
                      </SidebarMenuButton>

                      {/* Submenu */}
                      {hasSubmenu && isExpanded && (
                        <SidebarMenuSub className="ml-4 mt-1">
                          {item.submenu?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={cn(
                                  'px-4 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors',
                                  isActive(subItem.url) && 'bg-accent text-accent-foreground font-medium',
                                )}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Bottom Navigation */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors',
                      isActive(item.url) && 'bg-accent text-accent-foreground font-medium',
                    )}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with user info */}
      <SidebarFooter className="border-t border-border/40 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs">
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <SidebarMenuButton size="sm" className="h-8 w-8 p-0">
            <LogOut className="w-4 h-4" />
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
