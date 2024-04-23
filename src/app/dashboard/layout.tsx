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
    <div className="flex h-full">
      <div className="flex-none py-4 h-screen sticky top-0 hidden sm:block">
        <NavLinks />
      </div>
      <div className="flex-auto w-[00px] flex flex-col min-h-full gap-2 ">
        <DBHeader />
        <TimeDisplay />
        {children}
      </div>
      <ViewLogger />
    </div>
  );
}
