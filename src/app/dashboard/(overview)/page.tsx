import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import RecentSales from '@/components/admin/dashboard/RecentSales';
import RecentOrders from '@/components/admin/dashboard/RecentOrders';
import { Button } from '@/components/ui/button';
import StoreViews from '@/components/admin/dashboard/StoreViews';
import SellerViews from '@/components/admin/dashboard/SellerViews';
import { Suspense } from 'react';
import RecentSalesSkeleton from '@/components/admin/dashboard/RecentSalesSkeleton';

export default function Dashboard() {
  return (
    <main className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:3fr_1fr;] items-center justify-center gap-2">
      {/*1st-3rd columns */}
      <div className="w-full h-full flex flex-col gap-2">
        {/*Top 3 cards */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2">
          <Suspense fallback={<RecentSalesSkeleton />}>
            <RecentSales />
          </Suspense>
        </div>
        {/*Bottom 3 cards */}
        <RecentOrders />
      </div>
      {/*4th column */}
      <div className="w-full h-full flex flex-col gap-2">
        <span>Store Visitors</span>
        <StoreViews />
        <span>Seller Visitors</span>
        <SellerViews />
      </div>
    </main>
  );
}
