import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function ProductsBody() {
  const res = await fetch('https://fakestoreapi.com/products');
  interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
  }
  const products: Product[] = await res.json();

  return (
    <main className="h-full w-full rounded-lg bg-card flex flex-col p-2 gap-2">
      <div className="flex w-full gap-2">
        <div className="flex w-full">
          <Button>
            <Search />
          </Button>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-e-lg w-full"
          ></input>
        </div>
        <Button variant={'ghost'} className="text-sm">
          Filter <Filter />
        </Button>
      </div>
      <Table>
        <TableCaption>Complete list of products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>ID</TableHead>
            <TableHead className="text-right">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">
                {
                  <Image
                    src={p.image}
                    width={40}
                    height={40}
                    alt={p.id + ' image'}
                  />
                }
              </TableCell>
              <TableCell>{p.title}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.id}</TableCell>
              <TableCell className="text-right">{p.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
