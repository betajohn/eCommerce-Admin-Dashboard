import {
  LucideIcon,
  LogOut,
  Mail,
  ScrollText,
  SquareUser,
  Tag,
  LayoutDashboard,
  BookCopy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import Logo from '/public/images/JohnsSVG.svg';

interface menuItem {
  icon: LucideIcon;
  description: string;
}

const menuBtns: menuItem[] = [
  {
    icon: LayoutDashboard,
    description: 'Dashboard',
  },
  {
    icon: Tag,
    description: 'Products',
  },
  {
    icon: Mail,
    description: 'Messages',
  },
  {
    icon: ScrollText,
    description: 'Orders',
  },
  {
    icon: SquareUser,
    description: 'Customers',
  },
  {
    icon: BookCopy,
    description: 'Submissions',
  },
  {
    icon: LogOut,
    description: 'Logout',
  },
];

export function asideContent(sheet: boolean): ReactNode {
  return (
    <div className="flex flex-col h-full items-start justify-start py-2.5">
      <div className="w-full mb-10 object-cover px-6 sm:px-0 lg:p-4">
        <Logo className="mx-auto mt-1" />
      </div>
      {menuBtns.map((btn) => (
        <Button variant="ghost" key={btn.description} className="gap-1">
          <btn.icon className="w-6" />
          <span className={`${sheet === false && 'hidden xl:flex'}`}>
            {btn.description}
          </span>
        </Button>
      ))}
    </div>
  );
}

export default function Aside() {
  return (
    <aside className="hidden sm:flex h-full text-card-foreground">
      {asideContent(false)}
    </aside>
  );
}
