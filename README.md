# eCommerce-Admin-Dashboard

## Just learning css/tailwind and responsiveness

### width and height in css

- Default width and default height => auto = 'content area' | 'border area' (box-sizing:border-box) // great for variable elements such as textearea. // If size is fixed then overflow will happen.

```string
height =
 auto                                      |
 <length-percentage [0,∞]>                 |
 min-content                               |
 max-content                               |
 fit-content( <length-percentage [0,∞]> )

<length-percentage> =
 <length>      |
 <percentage>
```

- 100% of the screen: Make your app's body size equal to viewport size (same as h-[100vh] w-[100vw])

```css
body,
html {
  height: 100%;
}
```

- Setting min-max body width and centering it.

```html
<body className="w-full h-full min-w-[320px] max-w-[1200px] m-auto"></body>
```
