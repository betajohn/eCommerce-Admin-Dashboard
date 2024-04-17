import mongoose from 'mongoose';
import { generateGeoData } from '../raw/clientData.mjs';
import { payment_methods } from '../raw/preferences.mjs';
import { getRandomElement } from '../utils.mjs';

const generateRandomIP = () => {
  // IPv4 are 32-bit numerical values expressed in four octets separated by periods, such as 192.168.1.1.
  //IPv4 addresses range from 0.0.0.0 to 255.255.255.255,
  // IP addresses are assigned based on regional allocations, but they're not tied directly to the country code.
  //IP addresses do not necessarily have the same first three digits.
  //The first few digits of an IP address typically denote the network or the organization that manages the IP address block, rather than the country itself.
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
