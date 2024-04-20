import { CartType } from '@/database/models/Carts';
import { OrderType } from '@/database/models/Orders';
import { UserType } from '@/database/models/Users';
import { PaymentType } from '@/database/models/Payments';
import mongoose from 'mongoose';

export function generateRandomOrder(user: UserType, cart: CartType) {
  if (user === undefined) {
    throw new Error('Must provide a User');
  }
  if (cart === undefined) {
    throw new Error('Must provide a cart');
  }

  const order: OrderType = {
    _id: new mongoose.Types.ObjectId(),
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      user_id: user._id,
    },
    cart: {
      cart_id: cart._id,
      products: cart.products,
      cart_total: cart.cart_total,
      n_of_items: cart.n_of_items,
    },
    timestamp: cart.last_edition,
    payment: undefined,
    set assignPayment(p: PaymentType) {
      this.payment = {
        method: p.payment_info.method,
        payment_id: p._id,
      };
    },
  };

  return order;
}
