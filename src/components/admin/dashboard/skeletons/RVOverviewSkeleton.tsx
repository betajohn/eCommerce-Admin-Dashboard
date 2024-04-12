import { Skeleton } from '@/components/ui/skeleton';

let a = [1, 2, 3];
export default function RVOverviewSkeleton() {
  return (
    <>
      <span>Store Visitors</span>
      {a.map((x) => {
        return <Skeleton key={x} className="w-full aspect-[16/6]" />;
      })}
      <span>Code Sellers Visitors</span>
      {a.map((x) => {
        return <Skeleton key={x} className="w-full aspect-[16/6]" />;
      })}
    </>
  );
}
