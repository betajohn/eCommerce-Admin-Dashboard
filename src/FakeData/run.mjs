import { generateRandomOrder } from './scripts/generateOrder.js';
import { generateRandomUser } from './scripts/generateUser.ts/index.js';
import { writeToDisk } from './utils.mjs';
import { generateRandomPayment } from './scripts/generatePayment.ts/index.js';

//import countries from './raw/address/countries_full.json' assert { type: 'json' };

for (let i = 0; i < 1; i++) {
  const user = generateRandomUser();
  const order = generateRandomOrder(user);
  const payment = generateRandomPayment(order);

  user.assignOrder = order;
  order.assignPayment = payment;

  console.log(order);
}
