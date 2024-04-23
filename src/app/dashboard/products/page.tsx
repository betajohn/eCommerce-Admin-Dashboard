import { columns, Product } from '@/components/admin/products/Columns';
//import { DataTable } from '@/components/admin/products/DataTableOld';
import DataTable from '@/components/admin/products/DataTable';
import { getAllProducts } from '@/database/dbQueries/dbQueries';

export default async function DBProducts() {
  //const data = await getAllProducts('', 1);

  return (
    <main className="h-full rounded-lg bg-card flex flex-col gap-2">
      <DataTable />
    </main>
  );
}
