'use client';

import {
  LucideIcon,
  Users,
  Eye,
  CircleDollarSign,
  ReceiptText,
  QrCode,
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface DBCard {
  title: string;
  timeframe?: 'day' | 'month' | 'year';
  value: string;
  icon: LucideIcon;
}

const cards: DBCard[] = [
  {
    title: 'Sales Today',
    value: '$12340.12',
    icon: CircleDollarSign,
  },
  {
    title: 'Orders Today',
    value: '+1230',
    icon: ReceiptText,
  },
  {
    title: 'Codes Sold Today',
    value: '+1243',
    icon: QrCode,
  },
];

export default function TopThree() {
  return (
    <>
      {cards.map((c) => (
        <article
          key={c.title}
          className="relative rounded-lg bg-card text-card-foreground shadow-sm w-full flex flex-col p-4"
        >
          <span className="text-primary font-semibold text-3xl sm:text-[clamp(1.5rem,_3vw,_2rem)]">
            {c.value}
          </span>
          <h3 className="text-muted-foreground">{c.title}</h3>
          <div className="absolute h-[60%] aspect-square object-cover bottom-0 right-0 overflow-hidden">
            <c.icon className="w-[130%] h-[130%] text-gray-300 dark:text-gray-600" />
          </div>
        </article>
      ))}
    </>
  );
}
