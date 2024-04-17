import mongoose from 'mongoose';
import products from '../raw/products/products.json' assert { type: 'json' };
import {
  getRandomArbitraryDate,
  getRandomElement,
  getRandomMomentTodayUTC,
  getTotalAndQ,
} from '../utils.mjs';

export function generateRandomCart(user, isNew = true) {
  if (user === undefined) {
    throw new Error('Must provide a User');
  }
  const cartItems = [];
  const numberOfDiffProd = Math.floor(Math.random() * 8) + 1; // max = 9
  const timestamp = isNew
    ? getRandomMomentTodayUTC()
    : getRandomArbitraryDate(user.regist_date, user.last_login);
  for (let i = 0; i < numberOfDiffProd; i++) {
    let productData = getRandomElement(products);
    // makes sure products don't repeat
    while (cartItems.find((x) => x._id === productData._id)) {
      productData = getRandomElement(products);
    }
    cartItems.push({
      product_id: productData._id,
      product_name: productData.name,
      quantity: Math.floor(Math.random() * 9) + 1, //max q = 10
      price: productData.price,
    });
  }

  const { total, q } = getTotalAndQ(cartItems);

  return {
    _id: new mongoose.Types.ObjectId(),
    user_id: user._id,
    products: cartItems,
    timestamp: timestamp,
    cart_total: total,
    n_of_items: q,
  };
}
