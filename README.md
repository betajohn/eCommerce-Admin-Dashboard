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

Applying 'position: absolute' will switch an element to use Positioned layout

```

```

```
