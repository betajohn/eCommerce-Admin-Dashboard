import dbConnect from '@/database/dbConnect';
import { UserModel } from '@/database/models/Users';
import { CartModel } from '@/database/models/Carts';
import { PaymentModel } from '@/database/models/Payments';
import { generateRandomUser } from '@/FakeData/scripts/generateUser';
import { generateRandomPayment } from '@/FakeData/scripts/generatePayment';
import { generateRandomOrder } from '@/FakeData/scripts/generateOrder';
import { generateRandomCart } from '@/FakeData/scripts/generateCart';
import { generateRandomPageViews } from '@/FakeData/scripts/generatePageViews';
import OrdersModel from '@/database/models/Orders';
import { getRandomArbitrary, writeToDisk } from '@/FakeData/utils';
import { PageViewModel } from '@/database/models/PageView';
import generateRandomSubmission from '@/FakeData/scripts/generateSubmissions';
import SubmissionModel from '@/database/models/Submissions';
import { generateProducts } from '@/FakeData/scripts/generateProducts';
import { ProductsModel } from '@/database/models/Products';
import { generateStoreConfig } from '@/FakeData/scripts/generateStoreConfig';
import { StoreConfigModel } from '@/database/models/StoreConfig';

await dbConnect();

export async function seedAllToday(n: number) {
  try {
    const users = [];
    const orders = [];
    const payments = [];
    const carts = [];

    for (let i = 0; i < n; i++) {
      const user = generateRandomUser();
      const cart = generateRandomCart(user);
      const order = generateRandomOrder(user, cart);
      const payment = generateRandomPayment(order);
      user.assignOrder = order;
      order.assignPayment = payment;
      users.push(user);
      orders.push(order);
      payments.push(payment);
      carts.push(cart);
    }

    await UserModel.create(users);
    console.log(users.length + ' users have been seeded');
    await CartModel.create(carts);
    console.log(carts.length + ' carts have been seeded');
    await OrdersModel.create(orders);
    console.log(orders.length + ' orders have been seeded');
    await PaymentModel.create(payments);
    console.log(payments.length + ' payments have been seeded');
    console.log('seedAllToday(' + n + ') function completed successfully');
  } catch (error) {
    console.log(error);
  }
}

export async function registerUserNow(n = 1) {
  try {
    const users = [];
    const orders = [];
    const payments = [];
    const carts = [];

    for (let i = 0; i < n; i++) {
      const user = generateRandomUser();
      const cart = generateRandomCart(user);
      cart.timestamp = new Date();
      const order = generateRandomOrder(user, cart);
      const payment = generateRandomPayment(order);
      user.assignOrder = order;
      order.assignPayment = payment;
      users.push(user);
      orders.push(order);
      payments.push(payment);
      carts.push(cart);
    }

    await UserModel.create(users);
    console.log(users.length + ' users have been seeded');
    await CartModel.create(carts);
    console.log(carts.length + ' carts have been seeded');
    await OrdersModel.create(orders);
    console.log(orders.length + ' orders have been seeded');
    await PaymentModel.create(payments);
    console.log(payments.length + ' payments have been seeded');
    console.log('seedAllToday(' + n + ') function completed successfully');
    console.log('user_id:' + users[0]._id);
  } catch (error) {
    console.log(error);
  }
}

export async function seedPageViewsToday() {
  const pageViews = [];
  const uniqueViews = getRandomArbitrary(1, 50);
  for (let i = 0; i < uniqueViews; i++) {
    pageViews.push(...generateRandomPageViews());
  }
  try {
    await PageViewModel.create(pageViews);
    console.log(
      pageViews.length + ' page views have been successfully seeded.'
    );
  } catch (error) {
    console.log(error);
  }
}

export async function seedSubmissionsToday() {
  const users = [];
  const submissions = [];
  const nOfSubmissions = getRandomArbitrary(5, 35);

  try {
    for (let i = 0; i < nOfSubmissions; i++) {
      const user = generateRandomUser();
      const submission = generateRandomSubmission(user);
      user.assignSubmission = submission;

      users.push(user);
      submissions.push(submission);
    }
    await UserModel.create(users);
    console.log(users.length + ' users have been seeded');
    await SubmissionModel.create(submissions);
    console.log(submissions.length + ' submissions have been seeded');
  } catch (error) {
    console.log(error);
  }
}

export async function seedProducts() {
  try {
    const products = generateProducts();
    await ProductsModel.create(products);
    console.log(products.length + ' products have been successfully seeded');
  } catch (error) {
    console.log(error);
  }
}

export async function seedStoreConfig() {
  try {
    const data = generateStoreConfig();

    await StoreConfigModel.create(data);
    console.log('Store Configuration has been successfully seeded.');
  } catch (error) {
    console.log(error);
  }
}
