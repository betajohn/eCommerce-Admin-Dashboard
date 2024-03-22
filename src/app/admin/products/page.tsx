import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { columns, Product } from '@/components/admin/products/Columns';
import { DataTable } from '@/components/admin/products/DataTable';
import Image from 'next/image';

async function getData(): Promise<Product[]> {
  // simulate loading time to see loading.tsx
  console.log('Fetching revenue data...');
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log('Data fetch completed after 3 seconds.');
  // Fetch data from your API here.
  const res = await fetch('https://fakestoreapi.com/products');
  const products: Product[] = await res.json();
  return products;
}

export default async function DBProducts() {
  const data = await getData();

  return (
    <main className="h-full w-full rounded-lg bg-card flex flex-col p-2 gap-2">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
