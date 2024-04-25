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
import { FilePenLine, Pause, Trash2, SquareStackIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ProductType } from '@/database/models/Products';
import { DataTablePagination } from '@/components/admin/products/DataTablePagination';
import { Button } from '@/components/ui/button';

export default function DataTable() {
  const router = useRouter();

  const actionButtons = [
    {
      name: 'Edit',
      onclick: (_id: string) => {
        router.push(`/dashboard/products/edit?_id=${_id}`);
      },
      icon: FilePenLine,
    },
    {
      name: 'Clone',
      onclick: (_id: string) => {
        router.push(`/dashboard/products/new?_id=${_id}`);
      },
      icon: SquareStackIcon,
    },
    { name: 'Pause', onclick: (_id: string) => {}, icon: Pause },
    { name: 'Delete', onclick: (id: string) => {}, icon: Trash2 },
  ];

  const defaultColumns: ColumnDef<ProductType>[] = [
    {
      header: '',
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {actionButtons.map((btn) => {
                  return (
                    <div key={btn.name}>
                      <DropdownMenuItem
                        className="py-3 px-6"
                        onClick={() => {
                          btn.onclick(row.original._id.toString());
                        }}
                      >
                        {btn.name}
                        <btn.icon className="h-3" />
                      </DropdownMenuItem>
                      {btn != actionButtons[actionButtons.length - 1] && (
                        <DropdownMenuSeparator />
                      )}
                    </div>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      size: 70,
      enableResizing: false,
    },
    {
      accessorKey: 'images',
      header: 'Image',
      cell: (props: any) => (
        <div className="relative w-full aspect-video">
          <Image
            src={props.getValue()[0]}
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
      accessorKey: 'status',
      header: 'Status',
      cell: (props: any) =>
        props.getValue() === 'active' ? (
          <Badge>Active</Badge>
        ) : (
          <Badge variant="destructive">Inactive</Badge>
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
