import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface order {
  invoice: string;
  items: number;
  payment: 'Paypal' | 'Payoneer' | 'Webpay';
  buyer: string;
  amount: string;
}

const orders: order[] = [
  {
    invoice: 'INV001',
    items: 100,
    payment: 'Paypal',
    buyer: 'Alejandro Gomez',
    amount: '$10.24',
  },
  {
    invoice: 'INV002',
    items: 134,
    payment: 'Paypal',
    buyer: 'Hogner Gomis',
    amount: '$15.94',
  },
  {
    invoice: 'INV003',
    items: 10,
    payment: 'Paypal',
    buyer: 'Arthur Gay',
    amount: '$2.65',
  },
  {
    invoice: 'INV004',
    items: 50,
    payment: 'Payoneer',
    buyer: 'Peter Brown',
    amount: '$10.00',
  },
  {
    invoice: 'INV005',
    items: 200,
    payment: 'Paypal',
    buyer: 'joe Rodriguez',
    amount: '$30.00',
  },
  {
    invoice: 'INV006',
    items: 60,
    payment: 'Payoneer',
    buyer: 'Lucy Armstrong',
    amount: '$9.50',
  },
  {
    invoice: 'INV007',
    items: 120,
    payment: 'Paypal',
    buyer: 'Dan Elias',
    amount: '$11.44',
  },
  {
    invoice: 'INV008',
    items: 75,
    payment: 'Paypal',
    buyer: 'Francis Araya',
    amount: '$16.82',
  },
  {
    invoice: 'INV009',
    items: 40,
    payment: 'Paypal',
    buyer: 'Jorge Perez',
    amount: '$8.25',
  },
  {
    invoice: 'INV010',
    items: 10,
    payment: 'Paypal',
    buyer: 'Jean Sonez',
    amount: '$5.00',
  },
  {
    invoice: 'INV001',
    items: 300,
    payment: 'Paypal',
    buyer: 'Elia Houdini',
    amount: '$40.00',
  },
];

export default function RecentOrders() {
  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-2">
      <div className="">Recent Orders</div>
      <div className="w-full h-full rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableCaption>A list of your recent sales.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((ord) => (
              <TableRow key={ord.invoice}>
                <TableCell className="font-medium">{ord.invoice}</TableCell>
                <TableCell>{ord.items}</TableCell>
                <TableCell>{ord.payment}</TableCell>
                <TableCell>{ord.buyer}</TableCell>
                <TableCell className="text-right">{ord.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
