'use client';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
} from '@tanstack/react-table';
import products from '@/FakeData/raw/products/products.json';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
import { DataTablePagination } from '@/components/admin/products/DataTablePagination';

const defaultColumns: ColumnDef<ProductType>[] = [
  {
    accessorKey: 'image_url',
    header: 'Image',
    cell: (props: any) => (
      <div className="relative w-full aspect-video">
        <Image
          src={props.getValue()}
          fill
          alt="product image"
          className="p-2"
        />
      </div>
    ),
    size: 400,
    minSize: 200,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (props: any) => (
      <div className="w-full text-center">{props.getValue()}</div>
    ),
    size: 200,
    minSize: 200,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (data: any) => (
      <div className="w-full text-center">
        {formatCurrency(data.getValue())}
      </div>
    ),
    size: 100,
    minSize: 100,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: (props: any) => (
      <div className="w-full text-center">{props.getValue()}</div>
    ),
    size: 500,
    minSize: 500,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: (props: any) => (
      <div className="w-full whitespace-nowrap text-center">
        {props.getValue()}
      </div>
    ),
    size: 150,
    minSize: 150,
  },
  {
    accessorKey: 'active',
    header: 'Active',
    cell: (props: any) => (
      <div className="w-full text-center">{props.getValue().toString()}</div>
    ),
    size: 100,
    minSize: 100,
  },
  {
    accessorKey: '_id',
    header: '_id',
    cell: (props: any) => (
      <div className="w-full text-center">{props.getValue()}</div>
    ),
    size: 300,
    minSize: 300,
  },
];

export default function DataTable() {
  const [data, setData] = useState(products);
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
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
                      className={`w-[${header.getSize()}px] group relative text-center`}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
