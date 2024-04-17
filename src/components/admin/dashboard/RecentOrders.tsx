import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getTodaysLastTenOrders } from '@/database/dbQueries/dashboardQueries';

export default async function RecentOrders() {
  const orders = await getTodaysLastTenOrders();

  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-2">
      <div className="">Recent Orders</div>
      <div className="w-full h-full rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableCaption>A list of your recent sales.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">id</TableHead>
              <TableHead>Date UTC</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!orders ? (
              <TableRow>
                <TableCell>🙃</TableCell>
                <TableCell>🙃</TableCell>
                <TableCell>🙃</TableCell>
                <TableCell>🙃</TableCell>
                <TableCell>🙃</TableCell>
                <TableCell>🙃</TableCell>
              </TableRow>
            ) : (
              orders.map((ord) => (
                <TableRow key={ord.order_id}>
                  <TableCell className="font-medium">{ord.order_id}</TableCell>
                  <TableCell>{ord.timestamp.toUTCString()}</TableCell>
                  <TableCell>{ord.n_of_items}</TableCell>
                  <TableCell>{ord.payment_method}</TableCell>
                  <TableCell>{ord.customer}</TableCell>
                  <TableCell className="text-right">{ord.amount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
