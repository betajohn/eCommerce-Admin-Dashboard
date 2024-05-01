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

## Subscribing and Unsubscribing in react

### What is a subscription?

```text
The term "subscription" is generally used to mean you have some code that is listening for changes to some other code. This takes some resources to maintain, so usually there is a way to "unsubscribe", which shuts down the listener and frees up the resources.
```

## useEffect

useEffect is a React Hook that lets you synchronize a component with an external system.

```text
Some components need to synchronize with external systems. For example, you might want to control a non-React component based on the React state, set up a server connection, or send an analytics log when a component appears on the screen. Effects let you run some code after rendering so that you can synchronize your component with some system outside of React.
```

The cleanup function

When our code runs and reruns for every render, useEffect also cleans itself up using the cleanup function.

```text
The cleanup function prevents memory leaks — a situation where your application tries to update a state memory location that no longer exists — and removes unnecessary and unwanted behaviors.
```

As previously stated, the useEffect cleanup function helps developers clean effects that prevent unwanted behaviors, thereby optimizing application performance.

However, it is important to note that the useEffect cleanup function does not only run when our component wants to unmount — it also runs right before the execution of the next scheduled effect.
