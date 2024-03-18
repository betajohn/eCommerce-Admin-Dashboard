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

const paths: { [key: string]: string } = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/messages': 'Messages',
  '/admin/orders': 'Orders',
  '/admin/customers': 'Customers',
  '/admin/submissions': 'Submissions',
  '/admin/new-listing': 'Create a New listing',
};

export default function DBHeader() {
  const pathname = usePathname();
  console.log(pathname);
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
        <CardHeader className="py-0">
          <CardTitle className="text-xl">{paths[pathname]}</CardTitle>
        </CardHeader>
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
