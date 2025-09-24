'use client';

import Image from 'next/image';

import { Flex } from '~/components/layouts/flex';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Footer } from '~/components/ui/footer';
import { Navbar } from '~/components/ui/navbar';
import { H1, H2, P } from '~/components/ui/typography';

import { navigationGuest } from '../navigation';

export function PageLanding() {
  return (
    <section className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar navigation={navigationGuest} />
      <header className="flex flex-col md:flex-row items-center justify-between gap-10 px-8 py-20 max-w-6xl mx-auto">
        <div className="flex-1 space-y-6">
          <H1 className="text-nowrap">
            Manage your Business with our <span className="text-[var(--brand)]">SaaS</span>
          </H1>
          <P className="max-w-md text-[var(--text-secondary)]">
            Multi-tenant app: Everyone can register, manage products, customers, and transactions isolation in one platform.
          </P>
          <Flex gap={4} className="flex-wrap">
            <Button size="lg" className="bg-[var(--brand)] text-[var(--brand-contrast)]">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              See Demo Apps
            </Button>
          </Flex>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src="/point-of-sales.png"
            alt="POS Illustration"
            width={400}
            height={400}
            className="rounded-xl shadow-lg border border-[var(--surface-border)]"
          />
        </div>
      </header>
      {/* Features */}
      <main className="px-8 py-20 max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardContent className="p-6 space-y-3">
            <H2 className="text-xl font-semibold">Multi-Tenant</H2>
            <P className="text-[var(--text-secondary)]">Each has isolated data: products, customers, transactions are secure and private.</P>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-3">
            <H2 className="text-xl font-semibold">Customer Management</H2>
            <P className="text-[var(--text-secondary)]">Register customers, track shopping history, and increase loyalty.</P>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-3">
            <H2 className="text-xl font-semibold">Produk & Inventory</H2>
            <P className="text-[var(--text-secondary)]">Upload products, manage stock, and synchronize multiple branches easily.</P>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </section>
  );
}
