import mongoose from 'mongoose';
import products from '../raw/products/products.json' assert { type: 'json' };
import {
  getRandomArbitraryDate,
  getRandomElement,
  getRandomMomentToday,
  getTotal,
} from '../utils.mjs';

export function generateCart(user, isNew = true) {
  if (user === undefined) {
    throw new Error('Must provide a User');
  }
  const cartItems = [];
  const numberOfDiffProd = Math.floor(Math.random() * 8) + 1; // max = 9
  const timestamp = isNew
    ? getRandomMomentToday()
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

  return {
    _id: new mongoose.Types.ObjectId(),
    user_id: user._id,
    products: cartItems,
    last_edition: timestamp,
    cart_total: getTotal(cartItems),
  };
}

export function generateRandomOrder(user) {
  if (user === undefined) {
    throw new Error('Must provide a User');
  }
  const cartData = generateCart(user);
  return {
    _id: new mongoose.Types.ObjectId(),
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      user_id: user._id,
    },
    cart: {
      cart_id: cartData._id,
      products: cartData.products,
      cart_total: cartData.cart_total,
    },
    creation_date: cartData.last_edition,
    payment: undefined,
    set assignPayment(p) {
      this.payment = {
        method: p.payment_info.method,
        payment_id: p._id,
      };
    },
  };
}
