'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '../ModeToggle';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { usePathname } from 'next/navigation';
import NavLinks from '@/components/admin/NavLinks';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { toTitleCase } from '@/lib/utils';
import Link from 'next/link';

const paths: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/dashboard/products': 'Products',
  '/dashboard/messages': 'Messages',
  '/dashboard/orders': 'Orders',
  '/dashboard/customers': 'Customers',
  '/dashboard/submissions': 'Submissions',
  '/dashboard/new-listing': 'Create a New listing',
};

function createPathString(arr: string[], index: number) {
  let x = '/';
  for (let i = 1; i < index + 1; i++) {
    x = x + arr[i] + '/';
  }
  console.log(x);
  return x;
}

function BreadbrumbContainer() {
  const pathname = usePathname();
  console.log(pathname);
  const subPaths = pathname.split('/');
  console.log(subPaths);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {subPaths.map((x) => {
          if (subPaths.indexOf(x) === 1) {
            if (subPaths.length === 2) {
              return (
                <BreadcrumbItem key={subPaths.indexOf(x)}>
                  <BreadcrumbPage>{toTitleCase(x)}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            } else {
              return (
                <>
                  <BreadcrumbItem key={subPaths.indexOf(x)}>
                    <BreadcrumbLink asChild>
                      <Link href={`/${x}`}>{toTitleCase(x)}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              );
            }
          }
          if (subPaths.indexOf(x) > 1) {
            if (subPaths.indexOf(x) + 1 === subPaths.length) {
              return (
                <BreadcrumbItem key={subPaths.indexOf(x)}>
                  <BreadcrumbPage>{toTitleCase(x)}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            } else {
              return (
                <>
                  <BreadcrumbItem key={subPaths.indexOf(x)}>
                    <BreadcrumbLink asChild>
                      <Link
                        href={createPathString(subPaths, subPaths.indexOf(x))}
                      >
                        {toTitleCase(x)}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              );
            }
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function DBHeader() {
  return (
    <div className="w-full flex items-center justify-between rounded-lg border bg-card text-card-foreground shadow-sm p-2">
      <div className="flex justify-center items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="w-8 sm:hidden p-0" />
          </SheetTrigger>
          <SheetContent side="left" className="w-auto">
            <NavLinks hamburgerView={true} />
          </SheetContent>
        </Sheet>
        <BreadbrumbContainer />
      </div>
      <div className="flex justify-center items-center gap-2 px-2">
        <ModeToggle />
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
