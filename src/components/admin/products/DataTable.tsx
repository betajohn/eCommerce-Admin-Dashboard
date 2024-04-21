'use client';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import products from '@/FakeData/raw/products/products.json';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';

import {
  Table,
  TableCaption,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import Image from 'next/image';

const columns = [
  { accessorKey: '_id', header: '_id' },
  {
    accessorKey: 'image_url',
    header: 'Image',
    cell: (props: any) => (
      <div className="relative w-40 h-40">
        <Image src={props.getValue()} fill alt="product image" />
      </div>
    ),
  },
  { accessorKey: 'name', header: 'Name' },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (data: any) => formatCurrency(data.getValue()),
  },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'active', header: 'Active' },
];

export default function DataTable() {
  const [data, setData] = useState(products);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.column.columnDef.header?.toString()}
                  </TableHead>
                );
              })}
            </TableRow>
          );
        })}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => {
          return (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
