import dbConnect from '@/database/dbConnect';
import OrdersModel from '@/database/models/Orders';
import { timer } from '@/lib/utils';
import { unstable_noStore as noStore } from 'next/cache';

await dbConnect();

export async function getRecentOrdersData() {
  noStore();
  await timer(5000);
  const last24HoursDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  //4abril
  const ap = new Date(2024, 3, 10);

  try {
    const ordersData = await OrdersModel.aggregate([
      {
        $match: {
          timestamp: { $gte: ap },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$cart.total' },
          totalProductsSold: { $sum: '$cart.items_number' },
          numberOfOrders: { $sum: 1 },
        },
      },
    ]);

    return (
      ordersData[0] ?? {
        totalSales: 0,
        totalProductsSold: 0,
        numberOfOrders: 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
