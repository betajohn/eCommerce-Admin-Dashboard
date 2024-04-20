'use client';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import products from '@/FakeData/raw/products/products.json';
import { useState } from 'react';
import { UserType } from '@/database/models/Users';

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

const columns = [
  { accessorKey: '_id', header: '_id' },
  { accessorKey: 'name', header: 'name' },
  { accessorKey: 'price', header: 'price' },
  { accessorKey: 'description', header: 'description' },
  { accessorKey: 'category', header: 'category' },
  { accessorKey: 'image_url', header: 'image_url' },
  { accessorKey: 'active', header: 'active' },
];

export default function DataTable() {
  const [data, setData] = useState(products);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>ID</th>
        <th>Member Since</th>
        <th>Balance</th>
      </tr>
      <tr>
        <th>Margaret Nguyen</th>
        <td>427311</td>
        <td>
          <time dateTime="2010-06-03">June 3, 2010</time>
        </td>
        <td>0.00</td>
      </tr>
      <tr>
        <th>Edvard Galinski</th>
        <td>533175</td>
        <td>
          <time dateTime="2011-01-13">January 13, 2011</time>
        </td>
        <td>37.00</td>
      </tr>
      <tr>
        <th>Hoshi Nakamura</th>
        <td>601942</td>
        <td>
          <time dateTime="2012-07-23">July 23, 2012</time>
        </td>
        <td>15.00</td>
      </tr>
    </table>
  );
}
