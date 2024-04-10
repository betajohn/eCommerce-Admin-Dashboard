import {
  LucideIcon,
  CircleDollarSign,
  ReceiptText,
  QrCode,
} from 'lucide-react';
import { getRecentOrdersData } from '@/database/dbQueries/dashboard';
import { formatCurrency } from '@/lib/utils';

interface _OverviewCard {
  title: string;
  value?: string | number;
  icon: LucideIcon;
}

const cards: _OverviewCard[] = [
  {
    title: 'Sales Today',
    icon: CircleDollarSign,
  },
  {
    title: 'Orders Today',
    icon: ReceiptText,
  },
  {
    title: 'Codes Sold Today',
    icon: QrCode,
  },
];

export default async function RecentSales() {
  const res = await getRecentOrdersData();
  cards[0].value = formatCurrency(res.totalSales);
  cards[1].value = res.numberOfOrders;
  cards[2].value = res.totalProductsSold;

  return (
    <>
      {cards.map((c) => (
        <article
          key={c.title}
          className="relative rounded-lg bg-card text-card-foreground shadow-sm w-full flex flex-col p-4 aspect-[16/6]"
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
