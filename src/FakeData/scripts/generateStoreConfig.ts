import { StoreConfigType } from '@/database/models/StoreConfig';
import mongoose from 'mongoose';
import products from '../raw/products/products.json';
import {
  getRandomArbitrary,
  getRandomElement,
  siteLaunchDate,
} from '@/FakeData/utils';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

export function generateRandomLoremIpsum() {
  const lorenParts = loremIpsum.split('.');
  console.log(lorenParts);
  for (let i = 0; i < lorenParts.length; i++) {
    lorenParts[i] = lorenParts[i] + '.';
  }
  const lines = getRandomArbitrary(1, lorenParts.length);

  const answer: string[] = [];

  for (let i = 0; i < lines; i++) {
    let newLine = getRandomElement(lorenParts);
    while (answer.includes(newLine)) {
      newLine = getRandomElement(lorenParts);
    }
    answer.push(newLine);
  }

  let ans = '';

  answer.forEach((a) => {
    ans = ans + a + '.';
  });

  return ans;
}

function getCategFromProds() {
  const rawCategories: string[] = [];
  products.forEach((p) => {
    if (!rawCategories.includes(p.category)) {
      rawCategories.push(p.category);
    }
  });
  const categories: StoreConfigType['categories'] = rawCategories.map((c) => {
    return {
      _id: new mongoose.Types.ObjectId(),
      name: c,
      description: generateRandomLoremIpsum(),
      created_at: siteLaunchDate,
      updated_at: siteLaunchDate,
    };
  });

  return categories;
}

export function generateStoreConfig() {
  const storeConfig: StoreConfigType = {
    categories: getCategFromProds(),
  };
}
