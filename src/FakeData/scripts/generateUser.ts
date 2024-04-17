import mongoose from 'mongoose';
import maleNames from '../raw/name/firstNames_male.json' assert { type: 'json' };
import femaleNames from '../raw/name/firstNames_female.json' assert { type: 'json' };
import lastNames from '../raw/name/lastNames.json' assert { type: 'json' };
import countries from '../raw/address/countries.json' assert { type: 'json' };
import USAData from '../raw/address/statesAndCities.json' assert { type: 'json' };
import { generateRandomStreetAddress } from '../raw/address/street.mjs';
import { generateEmailDomain } from '../raw/emailDomains.mjs';
import {
  payment_methods,
  themes,
  getRandomLanguage,
} from '../raw/preferences.mjs';
import {
  getRandomArbitrary,
  getRandomElement,
  getRandom5DigitNumber,
  getRandomArbitraryDate,
  getRandomMomentToday,
  roundToTwoDecimals,
} from '../utils.mjs';

//Date.now() === new Date.getTime() //ms since epoch

const siteLaunchDate = new Date(2024, 0, 1);
const oldestBirthday = new Date(1924, 0, 1);
const now = new Date();
//user needs to be at least 13yo to have an account
const youngestBirthday = new Date(
  now.getFullYear() - 13,
  now.getMonth(),
  now.getDate()
);

function generateRandomDates() {
  const regist_date = getRandomArbitraryDate(siteLaunchDate, now);
  const last_login = getRandomArbitraryDate(regist_date, now);
  return { regist_date, last_login };
}

function getRandomFirstName() {
  // 70% of players are men, right?
  if (Math.random() > 0.69) {
    return getRandomElement(femaleNames);
  } else {
    return getRandomElement(maleNames);
  }
}

function generateRandomEmail(firstName, lastName) {
  return firstName + lastName + getRandom5DigitNumber() + generateEmailDomain();
}

function generateRandomAddress() {
  let data = undefined;
  let country = undefined;
  let state = undefined;
  let city = undefined;
  let dial_code = undefined;
  //70% of customers are from USA
  if (Math.random() > 0.69) {
    data = getRandomElement(countries);
    country = data.name;
    city = getRandomElement(data.biggest_cities);
    dial_code = data.dial_code;
  } else {
    data = getRandomElement(USAData);
    country = 'USA';
    state = data[0];
    city = getRandomElement(data[1]);
    dial_code = '+1';
  }
  const { name, number } = generateRandomStreetAddress();

  return {
    dial_code: dial_code,
    street: { number: number, name: name },
    city: city,
    state: state,
    postal_code: Math.floor(getRandomArbitrary(10000000, 9999999999)),
    country: country,
  };
}

export function generateRandomUser(isNew = true) {
  //regist_date and last_login have {default:Date.now} in UserSchema
  // No need to define them, mongoose will do that if left undefined.
  let regist = undefined;
  let lastLogin = undefined;
  if (!isNew) {
    const dates = generateRandomDates();
    regist = dates.regist_date;
    lastLogin = dates.last_login;
  } else {
    const moment = getRandomMomentToday();
    regist = moment;
    lastLogin = moment;
  }

  const firstName = getRandomFirstName();
  const lastName = getRandomElement(lastNames);
  const { dial_code, street, city, state, postal_code, country } =
    generateRandomAddress();
  return {
    _id: new mongoose.Types.ObjectId(),
    first_name: firstName,
    last_name: lastName,
    email: generateRandomEmail(firstName, lastName),
    regist_date: regist,
    last_login: lastLogin,
    address: { street, city, state, postal_code, country },
    phone: {
      dial_code: dial_code,
      number: getRandomArbitrary(10000000, 99999999),
    },
    birthdate: getRandomArbitraryDate(oldestBirthday, youngestBirthday),
    order_history: [],
    //setter function to add orders to order_history
    set assignOrder(order) {
      let q = 0;
      let total = 0;
      order.cart.products.forEach((p) => {
        q = q + p.quantity;
        total = total + p.quantity * p.price;
      });
      this.order_history.push({
        order_id: order._id,
        cart_total: roundToTwoDecimals(total),
        products_number: q,
      });
    },
    preferences: {
      payment_method: getRandomElement(payment_methods),
      theme: getRandomElement(themes),
      language: getRandomLanguage(),
      ship_to_address: Math.random() > 0.74 ? true : false,
    },
    //TODO:Submissions
    //TODO:Session IDs
  };
}
