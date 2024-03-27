import { columns, Product } from '@/components/admin/products/Columns';
import { DataTable } from '@/components/admin/products/DataTable';
import { getAllProducts } from '@/database/dbQueries';

export default async function DBProducts() {
  const data = await getAllProducts('', 1);

  return (
    <main className="h-full w-full rounded-lg bg-card flex flex-col p-2 gap-2">
      <div className="container mx-auto px-1">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
