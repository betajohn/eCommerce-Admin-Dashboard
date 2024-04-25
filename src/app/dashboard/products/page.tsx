import { columns, Product } from '@/components/admin/products/Columns';
import DataTable from '@/components/admin/products/DataTable';

export default async function DBProducts() {
  return (
    <main className="h-full rounded-lg bg-card flex flex-col gap-2">
      <DataTable />
    </main>
  );
}
