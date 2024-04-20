# React-table

[react-table documentation](https://tanstack.com/table/latest/docs/guide/tables)

React-table is a headless library.

> [!IMPORTANT] important: What is headless?
> In web development, "headless" typically refers to software or libraries that provide functionality without imposing a specific user interface.
> In other words, they provide the "brains" or logic behind a feature or component, but leave the presentation layer entirely up to the developer.

React-Table is considered a "headless" library because it provides a powerful set of tools for working with tabular data in React applications, but it doesn't dictate how that data should be displayed. Instead, it offers a collection of hooks, components, and utilities that you can use to build your own custom table UI.

## HTML table

```text
| HTML       |    shadcn      |
| ---------- | :------------: |
| <table>    | <Table>        |
| <caption>  | <TableCaption> |
| <thead>    | <TableHead>    |
| <colgroup> |                |
| <col>      |                |
| <th>       | <TableHeader>  |
| <tbody>    | <TableBody>    |
| <tr>       | <TableRow>     |
| <td>       | <TableCell>    |
| <tfoot>    | <TableFooter>  |
```

## 1.- Creating a table instance using useReactTable()

```ts
import { useReactTable } from '@tanstack/react-table';

export default function MyTable() {
  const table = useReactTable(data, columns);

  return <div>blablabla</div>;
}
```

### useReactTable() needs two arguments.

- data: The data that will be displayed in the table.
- columns: An array of column definitions. Each column definition is an object that defines the column.
  You need an object for each column.

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

### Creating the columns definitions

Column defs are the single most important part of building a table.

```ts

```
