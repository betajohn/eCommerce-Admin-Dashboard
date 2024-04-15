import { generateOrder } from './scripts/generateOrder.mjs';
//import countries from './raw/address/countries_full.json' assert { type: 'json' };

for (let i = 0; i < 10; i++) {
  console.log(generateOrder());
}
