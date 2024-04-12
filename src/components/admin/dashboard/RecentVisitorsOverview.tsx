import { getRecentUserData } from '@/database/dbQueries/dashboardQueries';
import { Users, Eye, UserPlus, Upload } from 'lucide-react';

export default async function RecentVisitorsOverview() {
  const data = await getRecentUserData();
  console.log('--data--');
  console.log(data);

  const StoreVisitorsCards = [
    {
      title: 'Store Unique Visitors',
      value: data?.uniqueStoreVisitors,
      icon: Users,
    },
    {
      title: 'Store Page Views',
      value: data?.storePageViews,
      icon: Eye,
    },
    {
      title: 'New Users',
      value: data?.newUsers,
      icon: UserPlus,
    },
  ];

  const codeSellersCards = [
    {
      title: 'Submissions',
      value: data?.submissionsNumber,
      icon: Upload,
    },
    {
      title: 'CS Unique Visitors',
      value: data?.uniqueCodeSellerVisitors,
      icon: Users,
    },
    {
      title: 'CS Page Views',
      value: data?.codeSellerPageViews,
      icon: Eye,
    },
  ];

  return (
    <>
      <span>Store Visitors</span>
      {StoreVisitorsCards.map((c) => (
        <article
          key={c.title}
          className="relative rounded-lg border bg-card text-card-foreground shadow-sm w-full aspect-[16/6] flex flex-col p-4"
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
      <span>Code Sellers Visitors</span>
      {codeSellersCards.map((c) => (
        <article
          key={c.title}
          className="relative rounded-lg border bg-card text-card-foreground shadow-sm w-full aspect-[16/6] flex flex-col p-4"
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
