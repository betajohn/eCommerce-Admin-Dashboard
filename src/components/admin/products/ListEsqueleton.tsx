import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const arr: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export default function ListEsqueleton() {
  return (
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
        {arr.map((p) => (
          <TableRow key={p}>
            <TableCell className="font-medium">
              <Skeleton className="h-[40px] w-[40px] rounded-xl" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-[40px] w-[200px] rounded-xl" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-[40px] w-[20px] rounded-xl" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-[40px] w-[20px] rounded-xl" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-[40px] w-[200px] rounded-xl" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
