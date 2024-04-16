import { generateRandomOrder } from './scripts/generateOrder.mjs';
import { generateRandomUser } from './scripts/generateUser.mjs';
import { writeToDisk } from './utils.mjs';
import { generateRandomPayment } from './scripts/generatePayment.mjs';

//import countries from './raw/address/countries_full.json' assert { type: 'json' };

for (let i = 0; i < 1; i++) {
  const user = generateRandomUser();
  const order = generateRandomOrder(user);
  const payment = generateRandomPayment(order);

  user.assignOrder = order;
  order.assignPayment = payment;

  console.log(order);
}
