# Working with data in javascript

## Data structures

### Set

> A value in the set may only occur once

Set objects are collections of values. A value in the set may only occur once; it is unique in the set's collection.

```js
const mySet = new Set();
// or
const mySet = new Set(array);
// will create a set out of an array ignoring duplicates
```

#### Set to Array

```js
const myArray = Array.from(mySet);
```

### Map

The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.

```js
const myMap = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
```

## Writting to the filesystem

> Only the Nodejs backend can write to the filesystem, browsers can't

```ts
import { writeFile } from 'fs';

// Convert the data to JSON format
const jsonData = JSON.stringify(array);

// Specify the file path
const filePath = './male_names.json';

// Write the JSON data to the file
writeFile(filePath, jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return;
  }
  console.log('Data has been written to', filePath);
});
```
