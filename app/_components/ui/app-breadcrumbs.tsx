'use client';

import Link from 'next/link';
import { FC, Fragment } from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '~/components/ui/breadcrumb';

export interface BreadcrumbProps {
  title: string;
  url: string;
  active: boolean;
}

export const Breadcrumbs: FC<{ items?: BreadcrumbProps[] }> = ({ items }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items?.map((item) => (
          <Fragment key={item.title}>
            {item.active ? (
              <Fragment>
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
                <BreadcrumbSeparator />
              </Fragment>
            ) : (
              <Fragment>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.url}>{item.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
