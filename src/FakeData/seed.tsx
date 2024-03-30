import productsData from './products.json';
import userData from './users.json';
import dbConnect from '@/database/dbConnect';
import { UserType, UserModel } from '@/database/models/Users';
import {
  ProductsModel,
  PausedProductsModel,
  ProductType,
} from '@/database/models/Products';

await dbConnect();

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
