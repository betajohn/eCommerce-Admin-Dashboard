import ListSkeleton from '@/components/admin/products/ListSkeleton';

export default function LoadingProducts() {
  return (
    <div className="h-full w-full rounded-lg bg-card flex flex-col p-2 gap-2">
      <ListSkeleton />
    </div>
  );
}
