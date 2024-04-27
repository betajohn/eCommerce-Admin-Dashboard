import { StoreConfigType } from '@/database/models/StoreConfig';
import mongoose from 'mongoose';
import products from '../raw/products/products.json';
import {
  getRandomArbitrary,
  getRandomElement,
  SITE_LAUNCH_DATE,
} from '@/FakeData/utils';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

export function generateRandomLoremIpsum() {
  const lorenParts = loremIpsum.split('.');

  const lines = getRandomArbitrary(1, lorenParts.length);

  const textStrings: string[] = [];

  for (let i = 0; i < lines; i++) {
    let newLine = getRandomElement(lorenParts);
    while (textStrings.includes(newLine)) {
      newLine = getRandomElement(lorenParts);
    }
    textStrings.push(newLine);
  }

  let ans = '';

  textStrings.forEach((a) => {
    if (textStrings.indexOf(a) !== textStrings.length - 1) {
      ans = ans + a + '. ';
    } else {
      ans = ans + a + '.';
    }
  });

  return ans;
}

export function getCategFromProds() {
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
      created_at: SITE_LAUNCH_DATE,
      updated_at: SITE_LAUNCH_DATE,
    };
  });
  console.log(categories);
  return categories;
}

export function generateStoreConfig() {
  const storeConfig: StoreConfigType = {
    _id: new mongoose.Types.ObjectId(),
    categories: getCategFromProds(),
  };

  return storeConfig;
}
