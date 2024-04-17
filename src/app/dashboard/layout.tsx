import DBHeader from '@/components/admin/DBHeader';
import NavLinks from '@/components/admin/NavLinks';
import TimeDisplay from '@/components/admin/dashboard/TimeDisplay';
import ViewLogger from '@/components/utils/ViewLogger';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="py-4 h-screen sticky top-0 hidden sm:block">
        <NavLinks />
      </div>
      <div className="flex w-full flex-col min-h-screen gap-2">
        <DBHeader />
        <TimeDisplay />
        {children}
      </div>
      <ViewLogger />
    </div>
  );
}
