import { LogOut, Mail, ScrollText, SquareUser, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

const menuBtns = [
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
    icon: LogOut,
    description: 'Logout',
  },
];

export function asideContent(sheet: boolean): ReactNode {
  return menuBtns.map((btn) => (
    <Button variant="ghost" key={btn.description} className="gap-1">
      <btn.icon className="w-6" />
      <span className={`${sheet === false && 'hidden lg:flex'}`}>
        {btn.description}
      </span>
    </Button>
  ));
}

export default function Aside() {
  return (
    <aside className="hidden sm:flex flex-col items-start h-full rounded-lg border bg-card text-card-foreground shadow-sm">
      {asideContent(false)}
    </aside>
  );
}
