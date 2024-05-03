export const NOW = new Date();
export const SITE_LAUNCH_DATE = new Date(Date.UTC(2024, 0, 1)); // server time
export const OLDEST_BIRTH_DATE = new Date(1924, 0, 1); // local time
export const YOUNGEST_BIRTH_DATE = new Date(
  Date.UTC(NOW.getUTCFullYear() - 13, NOW.getUTCMonth(), NOW.getUTCDate())
);

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
export function getRandomArbitraryDate(minDate: Date, maxDate: Date) {
  //transforms dates to ms-since-epoch, gets random number then converts it back to Date format.
  return new Date(
    Math.floor(
      Math.random() * (maxDate.getTime() - minDate.getTime()) +
        minDate.getTime()
    )
  );
}

export function getRandomMomentTodayUTC() {
  const NOW = new Date();
  const minDate = new Date(
    Date.UTC(NOW.getUTCFullYear(), NOW.getUTCMonth(), NOW.getUTCDate(), 0, 0, 0)
  );
  const maxDate = new Date(
    Date.UTC(
      NOW.getUTCFullYear(),
      NOW.getUTCMonth(),
      NOW.getUTCDate(),
      23,
      59,
      59
    )
  );
  return getRandomArbitraryDate(minDate, maxDate);
}

export function getRandomMoment() {
  return getRandomArbitraryDate(SITE_LAUNCH_DATE, new Date());
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

export function roundToTwoDecimals(n: number) {
  return Math.round(n * 100) / 100;
}

export function getTotalAndQ(
  arrOFProducts: { quantity: number; price: number }[]
) {
  let total = 0;
  let q = 0;
  for (let i = 0; i < arrOFProducts.length; i++) {
    total = total + arrOFProducts[i].quantity * arrOFProducts[i].price;
    q = q + arrOFProducts[i].quantity;
  }
  return { total: roundToTwoDecimals(total), q: q };
}
