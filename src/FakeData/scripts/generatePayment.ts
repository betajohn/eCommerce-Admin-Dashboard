import mongoose from 'mongoose';
import { generateGeoData, generateRandomIP } from '../raw/clientData.mjs';
import { payment_methods } from '../raw/preferences.mjs';
import { getRandomElement } from '../utils.mjs';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const generateRandomTransactionID = () => {
  return (
    getRandomElement(letters) +
    getRandomElement(letters) +
    getRandomElement(numbers) +
    getRandomElement(numbers) +
    getRandomElement(numbers) +
    getRandomElement(letters) +
    getRandomElement(letters) +
    getRandomElement(numbers) +
    getRandomElement(numbers) +
    getRandomElement(numbers)
  );
};

export function generateRandomPayment(order) {
  if (order === undefined) {
    throw new Error('Must provide an Order.');
  }
  return {
    _id: new mongoose.Types.ObjectId(),
    order_id: order._id,
    cart_total: order.total,
    payment_date: order.creation_date,
    client_data: {
      ip: generateRandomIP(),
      geo: generateGeoData(),
    },
    payment_info: {
      method: getRandomElement(payment_methods),
      transaction_id: generateRandomTransactionID(),
    },
  };
}
