import { Skeleton } from '@/components/ui/skeleton';

let a = [1, 2, 3];
export default function RecentSalesSkeleton() {
  return (
    <>
      {a.map((x) => {
        return <Skeleton key={x} className="w-full aspect-[16/6]" />;
      })}
    </>
  );
}
