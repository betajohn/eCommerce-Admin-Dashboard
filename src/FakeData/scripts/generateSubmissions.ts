import {
  getRandomArbitrary,
  getRandomArbitraryDate,
  getRandomMomentTodayUTC,
} from '@/FakeData/utils.mjs';
import { UserType } from '@/database/models/Users';

function getDigit() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
  const randomNumber = Math.floor(Math.random() * characters.length);
  return characters[randomNumber];
}

function createPkmCode() {
  let code = '';
  for (let i = 0; i < 3; i++) {
    code = code + getDigit();
  }
  code = code + '-';
  for (let i = 0; i < 4; i++) {
    code = code + getDigit();
  }
  code = code + '-';
  for (let i = 0; i < 3; i++) {
    code = code + getDigit();
  }
  code = code + '-';
  for (let i = 0; i < 3; i++) {
    code = code + getDigit();
  }
  return code;
}

export default function generateRandomSubmission(user: UserType, isNew = true) {
  if (user === undefined) {
    throw new Error('User is needed');
  }
  const numOfCodes = getRandomArbitrary(10, 200);
  const codes = [];
  for (let i = 0; i < numOfCodes; i++) {
    codes.push(createPkmCode());
  }

  return {
    codes: codes,
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      user_id: user._id,
    },
    timestamp: isNew
      ? getRandomMomentTodayUTC()
      : getRandomArbitraryDate(user.regist_date, new Date()),
    payment_details: {},
  };
}

export function xRandom() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
  const map = new Map();
  for (let i = 0; i < characters.length; i++) {
    map.set(characters[i], 0);
  }
  for (let i = 0; i < 10000; i++) {
    const n = Math.floor(Math.random() * characters.length);
    map.set(characters[n], map.get(characters[n]) + 1);
  }
  console.log(map);
}
