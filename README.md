# eCommerce-Admin-Dashboard

## Just learning css/tailwind and responsiveness

### shadcn

```text
Use 'primary' color // Card -> text-primary
```

### Tailwind applies CSS reset: Preflight.

```text
Preflight: An opinionated set of base styles for Tailwind projects built on top of modern-normalize.

//app/golbals.css
@tailwind base; /* Preflight will be injected here */

Default margins are removed
Headings are unstyled
Lists are unstyled
Images are block-level //  replaced elements (default='display: inline') -> 'display:block'
Images are constrained to the parent width
Border styles are reset globally

box-sizing: content-box(default) -> box-sizing: border-box;
```

### Extending Preflight

```text
Use the '@layer base' directive:

//app/globals.css
@layer base {
  h1 {
    @apply text-2xl;
  }
}
```

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

- 100% of the screen: Make your app's body size equal to viewport size (same as min-h-[100vh])

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
<html className="min-h-full ">
  <body className="h-full min-w-[320px] max-w-[1200px] m-auto"></body>
  /html>
</html>
```

### Responsive images: Use object-fit prop on the container for replaced children elements (images, videos) to fit the parent. Will auto adjust.

```css
//tailwind
className='object-cover'

//css
object-fit =
  fill        |
  contain     |
  cover       |
  none        |
  scale-down

```

- ALWAYS define absolute paths! Relative paths suck!!! everything breaks when you move files!!

```json
//tsconfig.json

"paths": {
      "@/*": ["./src/*"]
    }

//your component
import MyComp from '@/components/MyComp'

On vscode options look for importModuleSpecifier and set it to non-relative
```

- Referencing public folder

```text
Files inside public can be referenced by your code starting from the base URL (/).

public/avatars/me.png  -> src='/avatars/me.png'
```

### Common css mistakes

```css

In general:
Use max-width alongside width
Swap height for min-height

If you do need to use a fixed width value, make it flexible. My preferred way for doing that is adding max-width: 100% -> wont overflow smaller screens
```

- Margin

```text
I don't like to apply margin to "content elements." Instead, I create a wrapping element that applies the margin. Beign the reason that in practice you use UI Content elements such a form button.

One more note for a good use of margin: Headings and paragraphs.
```

- CSS Layout algorithms

```text

Flexbox
Positioned (eg. position: absolute)
Grid
Table
Flow
(Technically, they're called layout modes, not layout algorithms. But I find “layout algorithm” to be a more helpful label.)

```

```text
As the browser renders our HTML, every element will have its layout calculated using a primary layout algorithm.

You can change that layout algorithm. e.g: applying 'position: absolute' will switch an element to use Positioned layout.

```

### SVGs

```text
fill : currentcolor => fill color of the SVG shape will inherit the color of its parent element's text or color property in CSS.

you cannot directly use fill="currentcolor" in an SVG file when it's used as a background image through CSS. The fill="currentcolor" attribute in SVG works by inheriting the color value from the surrounding text or the color property in CSS. However, when an SVG is used as a background image, it's treated as an image rather than an element within the HTML markup. Therefore, it doesn't have access to the surrounding context or CSS properties like color.

```

### Html semantic

```text
<article> -> card | must have heading
```

## Fluid typografy

```text
Fluid typography is the idea that font-size (and perhaps other attributes of type, like line-height) change depending on the screen size.
```

### Always use rem

```text
rem -> <html>'s text size

For font-relative units that are root-based (such as rem), the font size is relative to the size of the font used by the <html> (root) element.
```

### Don't use viewport units alone

```text

Viewport units present an accessibility issue: they prevent users from being able to adjust text size zooming-in/out. Don't use them for font size alone.

use clamp instead
className="text-[clamp(1rem,3vw,2rem)]"

```

### Set desired font size according to given screen sizes

```text
example:
website sizes= min-w-[320px] max-w-[1200px]

```

### css functions

- min() & max()

```text
 min(a, b, c,): lets you set the smallest (most negative) value from a list of comma-separated expressions.
 max(a, b, c): analog for maximum value.
```

- calc()

```text

calc(expression): lets you perform calculations when specifying CSS property values.
-The + and - operators must be surrounded by whitespace
-calc(100 / 4)% is invalid, while calc(100% / 4) is valid.

-'font-size:2vw' wont change if you zoom-in/out because when zooming viewport size remains constant.

-'font-size:cal(1rem + 2vw)' avoids this accesibility problem. zooming modifies <html>'s font-size. The second part of the calculation will remain constant but the first part will make the webpage's text change when zooming.

```

- clam()

```text
'font-size: clamp(min, preferred, max)' // min, max and preferred are expressions.

-min: If the preferred value is less than this value, the minimum value will be used.
-preferred: expression whose value will be used as long as the result is between the minimum and maximum values.
-max: If the preferred value is more than this value, the maximum value will be used.
```
