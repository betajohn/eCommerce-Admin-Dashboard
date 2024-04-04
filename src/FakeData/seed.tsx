import productsData from './products.json';
import userData from './users.json';
import geoData from './geo_coordinates.json';
import { PageViewModel, PageViewType } from '@/database/models/PageView';
import OrdersModel from '@/database/models/Orders';
import { CartModel } from '@/database/models/Carts';
import dbConnect from '@/database/dbConnect';
import { UserType, UserModel } from '@/database/models/Users';
import {
  ProductsModel,
  PausedProductsModel,
  ProductType,
} from '@/database/models/Products';
import mongoose from 'mongoose';

await dbConnect();

const paths = ['/', '/sell-your-codes', '/offers', '/products'];
const randomPath = () => {
  return paths[Math.floor(Math.random() * paths.length)];
};

const methods = ['Paypal', 'Payoneer', 'Stripe', 'Webpay', 'Shopify'];
const randomMethod = () => {
  return methods[Math.floor(Math.random() * methods.length)];
};

const randomIP = () => {
  // IPv4 are 32-bit numerical values expressed in four octets separated by periods, such as 192.168.1.1.
  //IPv4 addresses range from 0.0.0.0 to 255.255.255.255,
  return (
    Math.floor(Math.random() * 256) +
    '.' +
    Math.floor(Math.random() * 256) +
    '.' +
    Math.floor(Math.random() * 256) +
    '.' +
    Math.floor(Math.random() * 256)
  );
};

const regions = ['NA', 'SA', 'CA', 'EU', 'Asia'];
const randomRegion = () => {
  return regions[Math.floor(Math.random() * regions.length)];
};

export const seedProducts = async () => {
  try {
    const prod: ProductType[] = [];
    const pausedProd: ProductType[] = [];
    productsData.forEach((p) => {
      if (p.active === true) {
        prod.push(p);
      } else {
        pausedProd.push(p);
      }
    });
    await ProductsModel.create(prod);
    await PausedProductsModel.create(pausedProd);
    console.log('Products successfully seeded');
  } catch (error) {
    console.log('Something went wrong');
    console.log(error);
  }
};

const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};
const daysFromNow = (d: number) => {
  // Date.now() returns the number of milliseconds elapsed since the epoch
  return new Date(Date.now() + d * 86400000);
};

export const seedUsers = async () => {
  const users: UserType[] = [];
  const now = new Date();
  const startDate = new Date(2022, 0, 1);
  const BDStart = new Date(1924, 0, 1);
  const BDEnd = new Date(2009, 0, 1);

  for (let i = 0; i < userData.length; i++) {
    const x: UserType = {
      _id: 'user' + (i + 1),
      first_name: userData[i].first_name,
      last_name: userData[i].last_name,
      email: userData[i].email,
      phone: userData[i].phone,
      birthdate: randomDate(BDStart, BDEnd),
      regist_date: randomDate(startDate, now),
      last_login: randomDate(startDate, now),
    };
    if (Math.random() <= 0.7) {
      x.address = {
        street: userData[i].street,
        city: userData[i].city,
        state: userData[i].state,
        postal_code: userData[i].postal_code,
        country: 'USA',
      };
    } else {
      x.address = {
        street: userData[i].street,
        city: userData[i].city,
        country: userData[i].country,
        postal_code: userData[i].postal_code,
      };
    }
    users.push(x);
  }

  try {
    await UserModel.create(users);
    console.log('Products successfully seeded');
  } catch (error) {
    console.log('Something went wrong');
    console.log(error);
  }
};

export const seedPageViews = async () => {
  const views: PageViewType[] = [];
  geoData.forEach((g) => {
    const v = {
      timestamp: randomDate(daysFromNow(-60), daysFromNow(2)),
      path: randomPath(),
      ip: randomIP(),
      geo: {
        city: g.city,
        country: g.country,
        latitude: g.latitude,
        longitude: g.longitude,
        region: randomRegion(),
      },
    };
    views.push(v);
  });
  try {
    await PageViewModel.create(views);
    console.log('Pageviews successfully seeded');
  } catch (error) {
    console.log('Something went wrong');
    console.log(error);
  }
};

export const seedOrders = async () => {
  //--1of2--create carts--
  let users = await UserModel.find({});
  let carts = [];
  //Generates carts equal to the number of users, assigns them randomly so some users won't have orders-
  for (let x = 0; x < users.length; x++) {
    let products = [];
    // chooses random product
    let productIndex = Math.floor(Math.random() * productsData.length);
    //determining number of different products bought at least 1 max 15
    let diffProducts = Math.floor(Math.random() * 15 + 1);
    for (let i = 0; i < diffProducts; i++) {
      products.push({
        product_id: productsData[productIndex]._id,
        product_name: productsData[productIndex].name,
        // generates random quantity of the product [1, 5] range
        quantity: Math.floor(Math.random() * 5 + 1),
        price: productsData[productIndex].price,
      });
    }
    let randomUserIndex = Math.floor(Math.random() * users.length);
    carts.push({
      _id: new mongoose.Types.ObjectId(),
      user_id: users[randomUserIndex]._id,
      first_name: users[randomUserIndex].first_name,
      last_name: users[randomUserIndex].last_name,
      timestamp: randomDate(daysFromNow(-60), daysFromNow(2)),
      products: products,
    });
  }
  try {
    await CartModel.create(carts);
    console.log('Carts have been seeded');
  } catch (error) {
    console.log(error);
  }

  //--2of2--create orders--
  const orders = [];
  //associate each cart to an order
  for (let a = 0; a < carts.length; a++) {
    let total = 0;
    let n = 0;
    carts[a].products.forEach((p) => {
      total = total + p.price * p.quantity;
      n = n + p.quantity;
    });
    orders.push({
      user: {
        first_name: carts[a].first_name,
        last_name: carts[a].last_name,
        user_id: carts[a].user_id,
      },
      cart: {
        cart_id: carts[a]._id,
        total: total,
        items_number: n,
      },
      payment: {
        payment_id: new mongoose.Types.ObjectId(),
        timestamp: carts[a].timestamp,
        method: randomMethod(),
      },
    });
  }
  try {
    await OrdersModel.create(orders);
    console.log('Orders have been seeded');
  } catch (error) {
    console.log(error);
  }
};
