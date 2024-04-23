'use client';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import products from '@/FakeData/raw/products/products.json';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

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
import { ProductType } from '@/database/models/Products';

const defaultColumns: ColumnDef<ProductType>[] = [
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
  { accessorKey: '_id', header: '_id' },
];

export default function DataTable() {
  const [data, setData] = useState(products);
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
  });

  console.log(table.getHeaderGroups()[0].headers[0].getSize());

  return (
    <Table className="table-fixed overflow-hidden">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.column.getSize() }}
                    className={`w-[${header.getSize()}px] group relative`}
                  >
                    {header.column.columnDef.header?.toString()}
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={cn(
                        'absolute opacity-0 top-0 right-0 h-full w-[5px] bg-green-300 cursor-col-resize	select-none	touch-none rounded-md group-hover:bg-green-300 group-hover:opacity-[1]',
                        header.column.getIsResizing() &&
                          'bg-green-400 opacity-[1]'
                      )}
                    ></div>
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
