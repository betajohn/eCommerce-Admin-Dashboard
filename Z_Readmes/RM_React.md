# React tricks and tips

## Props

- Passing props

```ts
// Case 1: this will add a data:{isValid:isValid, product:null} property to the props object
<IDNotFound data={{ isValid: isValid, product: null }} />

// Case 2:  this will add a data:isvalid property to the prop object
<IDNotFound data={isValid} />
```

- Accessing props

```ts
// Case 1
export default function IDNotFound(props) {
  console.log(props); // {data:{isValid:true, product:null}}
  return (
   //...
  );
}

// Case 2
export default function IDNotFound(props) {
  console.log(props); // {isValid: true}
  return (
   //...
  );
}

```

- Destructuring props

```ts
// Case 1
export default function IDNotFound({data}) {
  console.log(data); // {isValid:true, product:null}}
  return (
   //...
  );
}

// Case 2
export default function IDNotFound({isValid}}) {
  console.log(isValid); // true
  return (
   //...
  );
}

```
