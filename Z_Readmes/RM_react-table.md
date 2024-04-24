# React-table

[react-table documentation](https://tanstack.com/table/latest/docs/guide/tables)

React-table is a headless library.

> [!IMPORTANT] important: What is headless?
> In web development, "headless" typically refers to software or libraries that provide functionality without imposing a specific user interface.
> In other words, they provide the "brains" or logic behind a feature or component, but leave the presentation layer entirely up to the developer.

React-Table is considered a "headless" library because it provides a powerful set of tools for working with tabular data in React applications, but it doesn't dictate how that data should be displayed. Instead, it offers a collection of hooks, components, and utilities that you can use to build your own custom table UI.

## HTML table

You have to create the UI of the table. Use this.

```text
| HTML       |    shadcn      |
| ---------- | :------------: |
| <table>    | <Table>        |
| <caption>  | <TableCaption> |
| <thead>    | <TableHeader>  |
| <colgroup> |                |
| <col>      |                |
| <th>       | <TableHead>    |
| <tbody>    | <TableBody>    |
| <tr>       | <TableRow>     |
| <td>       | <TableCell>    |
| <tfoot>    | <TableFooter>  |
```

### Hydration errors

```ts
  <tfoot>
    <td></td>
    <td></td>
    <td></td>
  </tfoot>

//forgot<tr>
<tfoot>
 <tr>
   <td></td>
   <td></td>
   <td></td>
 </tr>
</tfoot>
```

## 1. Creating a table instance using useReactTable()

useReactTable() must receive an object as parameter.
That object must contain at the very least 3 props:

- data
- columns
- getCoreRowModel

```ts
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

export default function MyTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ColumnDef, //Type
  });

  return <div>blablabla</div>;
}

// this will be enough for creating the most basic table
```

### Getting the data

data is an array of objects that will be turned into the rows of your table. Each object in the array represents a row of data.

Don't forget to create a type for the shape of the data.

```ts
import products from '@/FakeData/raw/products/products.json'; // getting data from a json file
import getData from '/database/dbQueries';

//TData is the suggested name in the documentation.
interface TData {
  name: string;
  age: number;
  //blablabla
}

//or
const products: TData[] = await getData(); // getting data from a database
```

Note: data needs a "stable" reference (especially in React) in order to prevent infinite re-renders. This is why we recommend using React.useState or React.useMemo,

```ts
const [data, setData] = useState<TData[]>(products);
```

### Creating columns definitions

Column defs are the single most important part of building a table.

The column definitions are where we will tell TanStack Table how each column should access and/or transform row data with either an accessorKey or accessorFn.

```ts
//columns is an array of columnDefinitions.
//You should have a column definition for each column in your table.

const defaultColumns: ColumnDef<ProductType>[] = [
  {
    accessorKey: 'yourAccessorKey',
    header: 'YourHeaderName',
    cell: (data) => <div>soSomething(data)</div>,
    // other options:  meta, footer, accessorFN.
  },
  //add more definitions
];
```

Note: columns needs a "stable" reference (especially in React) in order to prevent infinite re-renders. This is why we recommend using React.useState or React.useMemo,

```ts
const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);
```

[See all the column definition options here](https://tanstack.com/table/v8/docs/api/core/column-def#accessorfn)

```ts
AccessorKey

accessorKey?: string & typeof TData

The key of the row object to use when extracting the value for the column.

```

```ts
Header

header?:
  | string
  | ((props: {
      table: Table<TData>
      header: Header<TData>
      column: Column<TData>
    }) => unknown)

The header to display for the column. If a string is passed, it can be used as a default for the column ID. If a function is passed, it will be passed a props object for the header and should return the rendered header value (the exact type depends on the adapter being used).
```

```ts
Cell

cell?:
  | string
  | ((props: {
      table: Table<TData>
      row: Row<TData>
      column: Column<TData>
      cell: Cell<TData>
      getValue: () => any
      renderValue: () => any
    }) => unknown)

The cell to display each row for the column. If a function is passed, it will be passed a props object for the cell and should return the rendered cell value (the exact type depends on the adapter being used).

```

Example

```ts
cconst defaultColumns: ColumnDef<ProductType>[] = [
  { accessorKey: '_id', header: '_id' },
  {
    accessorKey: 'image_url',
    header: 'Image',
    cell: (props: any) => (
      <Image
        src={props.getValue()}
        width={200}
        height={200}
        alt="product image"
      />
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
```

## 2. Creating the table

need to know 2 things:

- table.getHeaderGroup()
- table.getRowModel()

```ts
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
```

## 3. Resizing columns

### 3.1 Change the default table-layout

- set the table layout to fixed
- give the table a width

If no width is given, the table will still use the default table layout, meaning cell sizes are calculated automatically and your column sizes will be ignored.

```ts
<table className='table-fixed w-[something]'>
```

### 3.2 (optional) edit the ColumnResizeMode table option

By default, the column resize mode is set to "onEnd". This means that the column.getSize() API will not return the new column size until the user has finished resizing (dragging) the column. Usually a small UI indicator will be displayed while the user is resizing the column.

> [!TIP]
> The "onEnd" -default- column resize mode can be a good default option to avoid stuttering or lagging while the user resizes columns.

```ts
const table = useReactTable({
  //...
  columnResizeMode: 'onChange', //change column resize mode to "onChange"
});
```

### 3.3 Create an indicator to inform the user that columns are being resized

**_Don't forget to add its event handlers_**

```ts
<TableRow key={headerGroup.id}>
  {headerGroup.headers.map((header) => {
    return (
      <TableHead
        key={header.id}
        style={{ width: header.column.getSize() }}
        className={`w-[${header.getSize()}px] group relative`} // add tailwind's group and relative classes
      >
        {header.column.columnDef.header?.toString()}
        //this div will be the indicator
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={cn(
            'absolute opacity-0 top-0 right-0 h-full w-[5px] bg-green-300 cursor-col-resize	select-none	touch-none rounded-md group-hover:bg-green-300 group-hover:opacity-[1]',
            header.column.getIsResizing() && 'bg-green-400 opacity-[1]'
          )}
        ></div>
      </TableHead>
    );
  })}
</TableRow>
```
