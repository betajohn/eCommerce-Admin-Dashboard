import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { getTodaysLastTenOrders } from '@/database/dbQueries/dashboardQueries';

export default async function RecentOrders() {
  const orders = await getTodaysLastTenOrders();
  let p = 0;
  let q = 0;
  orders?.forEach((o) => {
    p = p + o.amount;
    q = q + o.n_of_items;
  });

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
                <TableCell scope="row" colSpan={6} className="text-center">
                  -No sales today-
                </TableCell>
              </TableRow>
            ) : (
              orders.map((ord) => (
                <TableRow key={ord.order_id}>
                  <TableCell className="font-medium">{ord.order_id}</TableCell>
                  <TableCell>{ord.timestamp.toUTCString()}</TableCell>
                  <TableCell>{ord.n_of_items}</TableCell>
                  <TableCell>{ord.payment_method}</TableCell>
                  <TableCell>{ord.customer}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(ord.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {orders && (
            <TableFooter>
              <TableRow>
                <TableCell scope="row" colSpan={2} className="text-xs">
                  Total number of items
                </TableCell>
                <TableCell>{q}</TableCell>
                <TableCell scope="row" colSpan={2} className="text-xs">
                  Total sold
                </TableCell>
                <TableCell>{formatCurrency(p)}</TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
}
