import { writeFile } from 'fs';

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

export function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function truncateToTwoDecimals(number) {
  return Math.floor(number * 100) / 100;
}

// Dates

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function getRandom5DigitNumber() {
  //determining number of digits
  const n = Math.floor(Math.random() * 5) + 1; // 5 is max number of digits
  let digits = '';
  for (let i = 0; i < n; i++) {
    digits = digits + '' + Math.floor(Math.random() * 10);
  }
  return digits;
}
