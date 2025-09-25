'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { FC } from 'react';

import { ToggleTheme } from '~/app/_components/ui/toggle-theme';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '~/components/ui/navigation-menu';

import { Flex } from '../layouts/flex';
import { Button } from './button';

interface NavbarProps {
  navigation?: { name: string; href: string }[];
}

export const Navbar: FC<NavbarProps> = ({ navigation }) => {
  const { data: session } = useSession();

  return (
    <div className="border-b w-full sticky top-0 z-50 bg-background">
      <div className="flex pr-24 h-16 w-full items-center">
        <Flex justify="space-between" className="min-w-2xs">
          <Link href="/" className="flex items-center space-x-2 mx-6">
            <span className="text-xl font-bold">Next Boilerplate</span>
          </Link>
        </Flex>

        {/* Navigation */}
        <NavigationMenu className="mx-6">
          <NavigationMenuList>
            {navigation?.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink href={item.href} className={navigationMenuTriggerStyle()}>
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          {/* Theme Toggle */}
          <ToggleTheme />

          {/* User Menu */}
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.image ?? ''} alt={session.user.name ?? ''} />
                    <AvatarFallback>{session.user.name?.charAt(0) ?? 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
