import { writeFile } from 'fs';

export const siteLaunchDate = new Date(Date.UTC(2024, 0, 1)); // server time
export const oldestBirthday = new Date(1924, 0, 1); // local time

export function writeToDisk(data, filePath = './male_names.json') {
  // Convert the data to JSON format
  const jsonData = JSON.stringify(data); // null and 2 for pretty formatting

  // Write the JSON data to the file
  writeFile(filePath, jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('Data has been written to', filePath);
  });
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function truncateToTwoDecimals(number: number) {
  return Math.floor(number * 100) / 100;
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

// maxDate is the closest to present > # of ms since epoch is always growing
// minDate is the oldest > # of ms since epoch decrease the oldest the date is. Before 1970 they turn negative.
export function getRandomArbitraryDate(minDate, maxDate) {
  //transforms dates to ms-since-epoch, gets random number then converts it back to Date format.
  return new Date(
    Math.floor(
      Math.random() * (maxDate.getTime() - minDate.getTime()) +
        minDate.getTime()
    )
  );
}

export function getRandomMomentTodayUTC() {
  const now = new Date();
  const minDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0)
  );
  const maxDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      23,
      59,
      59
    )
  );
  return getRandomArbitraryDate(minDate, maxDate);
}

export function getRandomMoment() {
  return getRandomArbitraryDate(siteLaunchDate, new Date());
}

export function getRandom5DigitNumber() {
  //determining number of digits
  const n = Math.floor(Math.random() * 5) + 1; // 5 is max number of digits
  let digits = '';
  for (let i = 0; i < n; i++) {
    digits = digits + '' + Math.floor(Math.random() * 10);
  }
  return Number(digits);
}

export function roundToTwoDecimals(n) {
  return Math.round(n * 100) / 100;
}

export function getTotalAndQ(arrOFProducts) {
  let total = 0;
  let q = 0;
  for (let i = 0; i < arrOFProducts.length; i++) {
    total = total + arrOFProducts[i].quantity * arrOFProducts[i].price;
    q = q + arrOFProducts[i].quantity;
  }
  return { total: roundToTwoDecimals(total), q: q };
}
