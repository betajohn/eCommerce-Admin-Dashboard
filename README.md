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
html {
  min-height: 100%;
}
body {
  height: 100%;
}
```

- Setting min-max body width and centering it.

```html
<html className="w-full min-h-full ">
  <body className="w-full h-full min-w-[320px] max-w-[1200px] m-auto"></body>
  /html>
</html>
```

- Use object-fit prop on the container for replaced children elements (images, videos) to fit the parent. Will auto adjust.

```css
className='object-cover'

object-fit =
  fill        |
  contain     |
  cover       |
  none        |
  scale-down

```

- Viewport units present an accessibility issue: they prevent users from being able to adjust text size zooming-in/out. Don't use them for font size alone.

```text
use clamp instead
className="text-[clamp(1rem,3vw,2rem)]"

```
