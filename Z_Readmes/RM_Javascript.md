# Javascript notes

## Object

### Set syntax (setter definition)

The set syntax binds an object property to a function to be called when there is an attempt to set that property. It can also be used in classes.

```js
const cart = {
  products = [],
  set addProduct(p){
    this.products.push(p)
  },
}

cart.products // []
cart.addProduct = 'Shirt' // you DON'T call it cart.addProduct() Error: not a function
cart.products = ['Shirt']
```

- Note that addProduct is not defined, and any attempts to access it will result in undefined.
- A setter must have exactly one parameter.
- Properties defined using this syntax are own properties of the created object, and they are configurable and enumerable.

## Numbers & Math

### Rounding

Number.prototype.toFixed() returns a String

```js
let x = (12.4567).toFixed(2); // 12.46
typeof x; // string
x = Number(x); // x=12.46,
typeof x; // number
```

Math.round() rounds to the nearest integer

```js
let a = Math.round(12.4567); // 12
let y = Math.round(12.4567 * 100) / 100; // 12.46
```

```js
x === y; // true
```

## Creating a search bar

```ts
<form">
  <Input type="search"/> // form will be submitted on enter
  <Button
    type="submit" //form will be submitted on click
    Search
  </Button>
</form>
```
