import {
  getRandomArbitrary,
  getRandomArbitraryDate,
  getRandomMomentTodayUTC,
} from '@/FakeData/utils';
import { SubmissionType } from '@/database/models/Submissions';
import { UserType } from '@/database/models/Users';
import mongoose from 'mongoose';

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

  const Subm: SubmissionType = {
    _id: new mongoose.Types.ObjectId(),
    user_id: user._id,
    timestamp: isNew
      ? getRandomMomentTodayUTC()
      : getRandomArbitraryDate(user.regist_date, new Date()),
    codes: {
      valid: codes,
    },
    valid_codes_n: codes.length,
  };

  return Subm;
}
