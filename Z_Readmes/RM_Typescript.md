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

## Ignore next error

```ts
/**
 * Explaining comment
 *
 * @ts-expect-error */
const multiLine: number = 'value';
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

## Ignoring just the next error

use // @ts-ignore

```ts
// @ts-ignore
const myNumber: number = 'hello'; // No error shown
```
