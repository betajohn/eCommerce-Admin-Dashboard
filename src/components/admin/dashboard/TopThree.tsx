import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, LucideIcon, Users, CreditCard, Eye } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface DBCard {
  title: string;
  timeframe: 'day' | 'month' | 'year';
  value: string;
  icon: LucideIcon;
}

const cards = [
  {
    title: 'Total Sales',
    timeframe: 'month',
    value: '$12340.12',
    icon: DollarSign,
  },
  {
    title: 'Website Visits',
    timeframe: 'month',
    value: '+1230',
    icon: Eye,
  },
  {
    title: 'Codes Sold',
    timeframe: 'month',
    value: '+1243',
    icon: CreditCard,
  },
];

export default function TopThree() {
  return (
    <>
      {cards.map((c) => (
        <Card key={c.title}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {c.title}
              <div className="h-full w-[20%]">
                <c.icon className="w-full h-full" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="font-bold text-4xl overflow-hidden text-primary">
            {c.value}
          </CardContent>
          <CardFooter>
            <ToggleGroup type="single" defaultValue="day">
              <ToggleGroupItem value="day">Day</ToggleGroupItem>
              <ToggleGroupItem value="month">Month</ToggleGroupItem>
              <ToggleGroupItem value="year">Year</ToggleGroupItem>
            </ToggleGroup>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
