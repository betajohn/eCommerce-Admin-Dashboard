import dbConnect from '@/database/dbConnect';
import OrdersModel, { OrderType } from '@/database/models/Orders';
import { PageViewModel } from '@/database/models/PageView';
import SubmissionModel from '@/database/models/Submissions';
import { UserModel } from '@/database/models/Users';
import { timer } from '@/lib/utils';
import { unstable_noStore as noStore } from 'next/cache';

await dbConnect();
const last24HoursDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

const now = new Date();

export const todayUTC00AM = new Date(
  Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0)
);
export const todayUTC12PM = new Date(
  Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    23,
    59,
    59
  )
);

export async function getRecentOrdersData() {
  noStore();
  await timer(5000);

  try {
    const ordersData = await OrdersModel.aggregate([
      {
        $match: {
          timestamp: { $gte: todayUTC00AM },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$cart.cart_total' },
          totalProductsSold: { $sum: '$cart.n_of_items' },
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

type RecentUserData = [
  (
    | {
        _id: string; //path as '/sell-your-codes'
        totalPageViews: number;
        uniqueVisitorsCount: number;
      }[]
    | [undefined]
  ),
  number,
  number
];

export async function getRecentUserData() {
  noStore();
  await timer(7000);

  try {
    const visitorsData = PageViewModel.aggregate([
      {
        $match: {
          timestamp: { $gte: todayUTC00AM },
        },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ['$path', '/sell-your-codes'] }, // Your condition, e.g., value >= 50
              then: '/sell-your-codes', // Value >= 50 goes to group1
              else: 'rest', // Value < 50 goes to group2
            },
          },
          totalPageViews: { $sum: 1 }, // Count the documents in each group
          uniqueVisitors: { $addToSet: '$ip' },
        },
      },
      {
        $project: {
          _id: 1,
          uniqueVisitorsCount: { $size: '$uniqueVisitors' },
          totalPageViews: 1,
        },
      },
    ]);

    const newSubmissionsQ = SubmissionModel.find({
      timestamp: { $gte: todayUTC00AM },
    }).countDocuments();

    const newUsersQ = UserModel.find({
      regist_date: { $gte: todayUTC00AM },
    }).countDocuments();

    const data: RecentUserData = await Promise.all([
      visitorsData,
      newSubmissionsQ,
      newUsersQ,
    ]);

    const StoreData = data[0]?.find((x) => x?._id === 'rest') ?? {
      _id: 'rest',
      totalPageViews: 0,
      uniqueVisitorsCount: 0,
    };

    const CodeSellersData = data[0]?.find(
      (x) => x?._id === '/sell-your-codes'
    ) ?? {
      _id: '/sell-your-codes',
      totalPageViews: 0,
      uniqueVisitorsCount: 0,
    };

    return {
      uniqueStoreVisitors: StoreData.uniqueVisitorsCount,
      storePageViews: StoreData.totalPageViews,
      newUsers: data[2],
      submissionsNumber: data[1],
      uniqueCodeSellerVisitors: CodeSellersData.uniqueVisitorsCount,
      codeSellerPageViews: CodeSellersData.totalPageViews,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getTodaysLastTenOrders() {
  noStore();
  await timer(3000);
  try {
    const data: OrderType[] | [undefined] = await OrdersModel.find({
      timestamp: { $gte: todayUTC00AM },
    })
      .sort({ timestamp: -1 })
      .limit(10);
    //if no sales today
    if (data.length === 0) return undefined;
    //
    const finalData = data.map((x) => {
      let totalQ = 0;
      x.cart.products.forEach((y) => {
        totalQ = totalQ + y.quantity;
      });
      return {
        order_id: x._id?.toString(),
        n_of_items: x.cart.n_of_items,
        payment_method: x.payment!.method,
        customer: x.user.first_name + ' ' + x.user.last_name,
        amount: x.cart.cart_total,
        timestamp: x.timestamp,
      };
    });

    return finalData;
  } catch (error) {
    console.log(error);
  }
}
