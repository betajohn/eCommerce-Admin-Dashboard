'use client';

import {
  LucideIcon,
  LogOut,
  Mail,
  SquareUser,
  Tag,
  LayoutDashboard,
  BookCopy,
  FilePlus,
  ClipboardList,
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Logo from '/public/images/JohnsSVG.svg';

interface menuItem {
  icon: LucideIcon;
  description: string;
  href: string;
}

const menuLinks: menuItem[] = [
  {
    icon: LayoutDashboard,
    description: 'Dashboard',
    href: '/admin',
  },
  {
    icon: Tag,
    description: 'Products',
    href: '/admin/products',
  },
  {
    icon: Mail,
    description: 'Messages',
    href: '/admin/messages',
  },
  {
    icon: ClipboardList,
    description: 'Orders',
    href: '/admin/orders',
  },
  {
    icon: SquareUser,
    description: 'Customers',
    href: '/admin/customers',
  },
  {
    icon: BookCopy,
    description: 'Submissions',
    href: '/admin/submissions',
  },
  {
    icon: FilePlus,
    description: 'New Listing',
    href: '/admin/new-listing',
  },
];

export default function NavLinks({ hamburgerView = false }) {
  console.log(hamburgerView);
  const pathname = usePathname();

  return (
    <div className="w-auto min-h-full flex flex-col justify-between">
      <div className="flex flex-col gap-6">
        <Logo className="px-4 py-2" />
        <div className="flex flex-col gap-2">
          {menuLinks.map((link) => {
            return (
              <Link
                key={link.description}
                href={link.href}
                className={cn(buttonVariants({ variant: 'ghost' }), 'px-6', {
                  'bg-card rounded-none sm:border sm:border-white':
                    pathname === link.href,
                })}
              >
                <link.icon className="w-6" />
                <p
                  className={cn({ 'hidden md:block': hamburgerView === false })}
                >
                  {link.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={() => console.log('logging out')}
        className="gap-1 px-1"
      >
        <LogOut className="w-6" />
        Logout
      </Button>
    </div>
  );
}
