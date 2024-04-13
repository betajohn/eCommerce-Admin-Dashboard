import mongoose from 'mongoose';
import maleNames from '../raw/name/firstNames_male.json' assert { type: 'json' };
import femaleNames from '../raw/name/firstNames_female.json' assert { type: 'json' };
import lastNames from '../raw/name/lastNames.json' assert { type: 'json' };
import countries from '../raw/address/countries.json' assert { type: 'json' };
import USAData from '../raw/address/statesAndCities.json' assert { type: 'json' };
import { generateRandomStreetAddress } from '../raw/address/street.mjs';
import { generateEmailDomain } from '../raw/emailDomains.mjs';
import {
  getRandomArbitrary,
  getRandomElement,
  getRandom5DigitNumber,
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
  const regist_date = new Date(
    getRandomArbitrary(siteLaunchDate.getTime(), now.getTime())
  );
  let last_login = siteLaunchDate;
  while (regist_date > last_login) {
    last_login = new Date(
      getRandomArbitrary(siteLaunchDate.getTime(), now.getTime())
    );
  }
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

export function generateRandomUser(isNew) {
  //regist_date and last_login have {default:Date.now} in UserSchema
  // No need to define them, mongoose will do that if left undefined.
  let regist = undefined;
  let lastLogin = undefined;
  if (!isNew) {
    const dates = generateRandomDates();
    regist = dates.regist_date;
    lastLogin = dates.last_login;
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
      number: Math.floor(getRandomArbitrary(10000000, 99999999)),
    },
    birthdate: new Date(
      getRandomArbitrary(oldestBirthday.getTime(), youngestBirthday.getTime())
    ),
  };
}
