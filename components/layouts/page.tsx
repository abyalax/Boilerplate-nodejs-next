'use client';

import { FC, Fragment, PropsWithChildren } from 'react';

import { BreadcrumbProps, Breadcrumbs } from '~/app/_components/ui/app-breadcrumbs';
import { ToggleTheme } from '~/app/_components/ui/toggle-theme';
import { SidebarTrigger, useSidebar } from '~/components/ui/sidebar';
import { H3 } from '~/components/ui/typography';

import { Flex } from './flex';

interface PageScreenProps extends PropsWithChildren {
  title: string;
  breadcrumbs: BreadcrumbProps[];
}

export const PageScreen: FC<PageScreenProps> = ({ title, breadcrumbs, children }) => {
  const { isMobile } = useSidebar();
  return (
    <Fragment>
      <SidebarTrigger hidden={!isMobile} />
      <main className="p-6 space-y-6 bg-background min-h-screen">
        <Flex justify="space-between">
          <Flex direction="column" gap={20}>
            <H3 className="text-start">{title}</H3>
            <Breadcrumbs items={breadcrumbs} />
          </Flex>
          <ToggleTheme className="max-h-fit" />
        </Flex>
        {children}
      </main>
    </Fragment>
  );
};
