import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TopThree from '@/components/admin/dashboard/TopThree';
import LastOrders from '@/components/admin/dashboard/RecentOrders';
import { Button } from '@/components/ui/button';

export default function DBBody() {
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:3fr_1fr;] items-center justify-center gap-2">
      {/*1st-3rd columns */}
      <div className="w-full h-full flex flex-col gap-2">
        {/*Top 3 cards */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2">
          <TopThree />
        </div>
        {/*Bottom 3 cards */}
        <LastOrders />
      </div>
      {/*4th column */}
      <div className="w-full h-full flex flex-col gap-2">
        <Card className="w-full h-[200px]">
          <CardContent>
            <Button>Click me</Button>
          </CardContent>
        </Card>
        <Card className="w-full h-[200px]">
          <CardContent>d2</CardContent>
        </Card>
        <Card className="w-full h-[200px]">
          <CardContent>d3</CardContent>
        </Card>
      </div>
    </div>
  );
}
