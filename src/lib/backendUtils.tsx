import { writeFile } from 'fs';

export function writeToDisk(data: any, filePath = './result.json') {
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
