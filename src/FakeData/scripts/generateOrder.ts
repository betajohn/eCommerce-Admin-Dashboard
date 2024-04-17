import mongoose from 'mongoose';

export function generateRandomOrder(user, cart) {
  if (user === undefined) {
    throw new Error('Must provide a User');
  }
  if (cart === undefined) {
    throw new Error('Must provide a cart');
  }
  const cartData = cart;
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
      n_of_items: cartData.n_of_items,
    },
    timestamp: cartData.timestamp,
    payment: undefined,
    set assignPayment(p) {
      this.payment = {
        method: p.payment_info.method,
        payment_id: p._id,
      };
    },
  };
}
