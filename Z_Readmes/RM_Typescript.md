# Typescript notes and tips

## Importing JSON

Typescript will automatically define types.

```ts
//generateUser.ts
import lastNames from '../raw/name/lastNames.json';

type n = typeof lastNames; // string[]
```

## Generic Functions

Given the following regular JS function, its return type can't be inferred by the compiler.

```ts
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

let x = getRandomElement([1, 2, 3]); // typeof x => any
// but we are getting a number every time??
```

We need to a make it a generic function.

```ts
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
let x = getRandomElement([1, 2, 3]); // typeof x => number
```

## Ignore errors

### Ignore all errors

```ts
/**
 * Explaining comment
 *
 * @ts-expect-error */
const multiLine: number = 'value';
```

### Ignoring just the next error

use // @ts-ignore

```ts
// @ts-ignore
const myNumber: number = 'hello'; // No error shown
```

## Pushing into an empty Array

> ts error: "not assignable to parameter of type never"

```ts
const result = [];
result.push(2); //error
```

```ts
//Just define its type
const result: number[] = [];
```

## [number] Wrong type

[number] is a valid type BUT it represents an array with a single element, and that element must be of type number. It's an array tuple with only one element.

```ts
Did you mean number[]?
Yeah, you probably did.
```

## Create a type from a different type

### Type as subtype

We can use an indexed access type to look up a specific property on another type:

```ts
interface CartType {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  last_edition: Date;
  cart_total: number;
  products: {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }[];
}

type products = CartType['products'];
```

### Convert an Array of Strings into a String Literal Union Type

We can achieve this using the `number` and `as const` keywords.

`typeof myArray[number]` represents the union type of all the string literals contained in the myArray array.

```ts
// define the array 'as const'
const categories = [
  'sports',
  "men's clothing",
  'electronics',
  "women's clothing",
  'jewelry',
] as const;

// create the union type with the number keyword

type Category = (typeof categories)[number];

const BlaBla: Category = 'Sodas'; // type Error
```

## Type Assertion of myArray.find()

You can use a type assertion to assert that the result of find() will never be undefined. This is useful when you are certain that the element exists in the array:

```ts
const categoryData = categories.find((c) => {
  return c.name === name;
}) as (typeof categories)[number]; // Asserting that it's never undefined. Changes the inferred type which contains undefined -in case of array.find() not finding any matches-.
```
