//import countries from './raw/address/countries_full.json' assert { type: 'json' };

import { generateRandomUser } from './scripts/generateUser.mjs';

import { getRandomArbitrary, writeToDisk } from './utils.mjs';

for (let i = 0; i < 10; i++) {
  console.log(generateRandomUser(false));
}
