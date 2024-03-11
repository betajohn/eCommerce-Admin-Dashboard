import { LucideIcon, Users, Eye, Upload } from 'lucide-react';

interface SellerCard {
  title: string;
  value: number;
  icon: LucideIcon;
}

const sellerCards: SellerCard[] = [
  {
    title: 'submissions',
    value: 10,
    icon: Upload,
  },
  {
    title: 'Unique Visitors',
    value: 123,
    icon: Users,
  },
  {
    title: 'Page Views',
    value: 1543,
    icon: Eye,
  },
];

export default function SellerViews() {
  return (
    <>
      {sellerCards.map((c) => (
        <article
          key={c.title}
          className="relative rounded-lg border bg-card text-card-foreground shadow-sm w-full flex flex-col p-4"
        >
          <span className="text-primary font-semibold text-3xl sm:text-[clamp(1.5rem,_3vw,_2rem)]">
            {c.value}
          </span>
          <h3 className="text-muted-foreground">{c.title}</h3>
          <div className="absolute h-[60%] aspect-square object-cover bottom-0 right-0 overflow-hidden">
            <c.icon className="w-[110%] h-[110%] text-gray-300 dark:text-gray-600" />
          </div>
        </article>
      ))}
    </>
  );
}
