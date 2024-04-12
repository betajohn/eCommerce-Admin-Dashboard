import RecentOrdersOVerview from '@/components/admin/dashboard/RecentOrdersOverview';
import RecentOrders from '@/components/admin/dashboard/RecentOrders';
import { Suspense } from 'react';
import ROOverviewSkeleton from '@/components/admin/dashboard/skeletons/ROOverviewSkeleton';
import RVOverviewSkeleton from '@/components/admin/dashboard/skeletons/RVOverviewSkeleton';
import RecentVisitorsOverview from '@/components/admin/dashboard/RecentVisitorsOverview';

export default function Dashboard() {
  return (
    <main className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:3fr_1fr;] items-center justify-center gap-2">
      {/*1st-3rd columns */}
      <div className="w-full h-full flex flex-col gap-2">
        {/*Top 3 cards */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2">
          <Suspense fallback={<ROOverviewSkeleton />}>
            <RecentOrdersOVerview />
          </Suspense>
        </div>
        {/*Bottom 3 cards */}
        <RecentOrders />
      </div>
      {/*4th column */}
      <div className="w-full h-full flex flex-col gap-2">
        <Suspense fallback={<RVOverviewSkeleton />}>
          <RecentVisitorsOverview />
        </Suspense>
      </div>
    </main>
  );
}
