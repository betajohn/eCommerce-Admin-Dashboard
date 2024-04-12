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

let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function ROSkeleton() {
  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-2">
      <div className="">Recent Orders</div>
      <div className="w-full h-full rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableCaption>A list of your recent sales.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">id</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {a.map((b) => (
              <TableRow key={b}>
                <TableCell className="font-medium">
                  <Skeleton className="h-10" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-10" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
