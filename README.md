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

## Using server actions to fetch data

- What is CSR? (Client Side Rendering)

```text
CSR was the standard for Single Page Applications.
Client requests the webpage to the server and gets a single <div> with a link to a javascript file that contains the whole app, including UI and react library. The webpage is then completely rendered by the browser using that javascript file. | note: Rendering is the process of generating HTML markup to display web pages in the browser.

Drawbacks of CSR
- not optimal for SEO: it provides little content for search engines to index.
- having the browser (the client) handle all the work, such as fetching data, computing the UI, and making the HTML interactive, can slow things down
```

- What is SSR? (Server Side Rendering)

```text
To overcome the drawbacks of CSR, modern React frameworks like Next.js, pivoted towards server-side solutions. This approach fundamentally changes how content is delivered to the user.

Instead of sending a nearly empty HTML file that depends on client-side JavaScript to construct the page, the server takes charge of rendering the full HTML.

This fully-formed HTML document is then sent directly to the browser. Since the HTML is generated on the server, the browser is able to quickly parse and display it, improving the initial page load time.

SSR fixes CSR drawbacks
 -Significantly improves SEO because search engines can easily index the server-rendered content.
 -Browsers can immediately load the page HTML content, instead of a blank screen or loading spinner.

```

- What is Hydratation?

```text
The full interactivity of the page is on hold until the JavaScript bundle — comprising React itself along with your application specific code — has been completely downloaded and executed by the browser.

Hydration is where the static page, initially served by the server, is brought to life. React takes control in the browser, reconstructing the component tree in memory based on the static HTML that was served. It carefully plans the placement of interactive elements within this tree.

Then, React proceeds to bind the necessary JavaScript logic to these elements.
```

- What is SSG?

```text

Server-side solutions can be categorized into two strategies: Static Site Generation (SSG) and Server-side Rendering (SSR).

SSG occurs at build time, when the application is deployed on the server. This results in pages that are already rendered and ready to serve. It is ideal for content that doesn't change often, like blog posts.

```

- Downsides of SSR

```text
 - If a component needs to fetch data from a database or another source (like an API), this fetching must be completed before the server can begin rendering the page. Components cannot start rendering and then pause or "wait" while data is still being loaded.

 This can delay the server's response time to the browser, as the server must finish collecting all necessary data before any part of the page can be sent to the client.

 - A second issue with SSR is that for successful hydration the component tree in the browser must exactly match the server-generated component tree. This means that all the JavaScript for the components must be loaded on the client before you can start hydrating any of them.

 - The third issue with SSR is related to hydration itself. React hydrates the component tree in a single pass, meaning once it starts hydrating, it won’t stop until it’s finished with the entire tree. As a consequence, all components must be hydrated before you can interact with any of them.

 These three problems — having to load the data for the entire page, load the JavaScript for the entire page, and hydrate the entire page — create an all-or-nothing waterfall problem that spans from the server to the client, where each issue must be resolved before moving to the next one.
```

- Suspense component for Server-side Rendering

```tex
<Suspense> for SSR was introduced in React 18 to address the performance drawbacks of traditional SSR. This new architecture allows you to use the <Suspense> component to unlock two major SSR features:

-HTML streaming on the server

with React 18, we have a new possibility. By wrapping a part of the page, such as the main content area, within the React Suspense component, we instruct React it doesn’t need to wait for the main section data to be fetched to start streaming the HTML for the rest of the page. React will send a placeholder like a loading spinner instead of the complete content.

Once the server is ready with the data for the main section, React sends additional HTML through the ongoing stream, accompanied by an inline <script> tag containing the minimal JavaScript needed to correctly position that HTML. As a result of this, even before the full React library is loaded on the client side, the HTML for the main section becomes visible to the user.

This solves our first problem. You don’t have to fetch everything before you can show anything. If a particular section delays the initial HTML, it can be seamlessly integrated into the stream later

-Selective hydration on the client (Lazy Loading)

Until the JavaScript for the main section is loaded, client-side app hydration cannot start. And if the JavaScript bundle for the main section is large, this could significantly delay the process.

To mitigate this, code splitting can be used. Code splitting means you can mark specific code segments as not immediately necessary for loading, signaling your bundler to segregate them into separate <script> tags.

Using React.lazy for code splitting enables you to separate the main section's code from the primary JavaScript bundle. As a result, the JavaScript containing React and the code for the entire application, excluding the main section, can now be downloaded independently by the client, without having to wait for the main section's code.

By wrapping the main section within <Suspense>, you've indicated to React that it should not prevent the rest of the page from not just streaming but also from hydrating. This feature, called selective hydration allows for the hydration of sections as they become available, before the rest of the HTML and the JavaScript code are fully downloaded.
```

- React Server Components (RSC)

```text
A new architecture designed by the React team. Aims to leverage the strengths of both server and client environments, optimizing for efficiency, load times, and interactivity.

The architecture introduces a dual-component model, differentiating between Client Components and Server Components.  This distinction is not based on the functionality of the components but rather on where they execute and the specific environments they are designed to interact with.

-Client Components ('use client')

Client components have access to the client environment, such as the browser, allowing them to use state, effects, and event listeners, to handle interactivity and also access browser-exclusive APIs like geolocation or localStorage, allowing you to build the frontend for specific use cases, just as we've done all these years before the introduction of the RSC architecture.

In fact, the term client component doesn’t signify anything new; it simply helps differentiate these components from the newly introduced Server Components

-Server Components ('use server') | By default every component is a server component.

 A new type of React component specifically designed to operate exclusively on the server. And unlike client components, their code stays on the server and is never downloaded to the client.

```

- Benefits of React Server Components

```text
-Zero-bundle sizes :Server Components do not send code to the client.

- Direct access to server-side resources: By having direct backend access to server-side resources like databases or file systems, Server Components enable efficient data fetching and rendering without needing additional client-side processing.

- Enhanced security: Exclusive server-side execution enhances security by keeping sensitive data and logic, including tokens and API keys, away from the client-side.

-Improved data fetching: Typically, when fetching data on the client-side using useEffect, a child component cannot begin loading its data until the parent component has finished loading its own. This sequential fetching of data often leads to poor performance.

The main issue is not the round trips themselves, but that these round trips are made from the client to the server. Server Components enable applications to shift these sequential round trips to the server side. By moving this logic to the server, request latency is reduced, and overall performance is improved, eliminating client-server waterfalls.

-Caching:Rendering on the server enables caching of the results, which can be reused in subsequent requests and across different users. This approach can significantly improve performance and reduce costs by minimizing the amount of rendering and data fetching required for each request.

-Faster initial page load and First Contentful Paint: By generating HTML on the server, pages render immediately without the delay of downloading, parsing, and executing JavaScript.

-Improved SEO: The server-rendered HTML is fully accessible to search engine bots, enhancing the indexability of your pages.

-Efficient streaming:  Server Components allows the rendering process to be divided into manageable chunks, which are then streamed to the client as soon as they are ready.This approach allows users to start seeing parts of the page earlier, eliminating the need to wait for the entire page to finish rendering on the server.

```

- 'use client'

```text
It signals to the bundler that this component, along with any components it imports, is intended for client-side execution. As a result, the component gains full access to browser APIs and the ability to handle interactivity.
```

- Server Actions

```text
Server Actions are asynchronous functions that are executed on the server.

A Server Action can be defined with the React "use server" directive. You can place the directive at the top of an async function to mark the function as a Server Action, or at the top of a separate file to mark all exports of that file as Server Actions.
```

- Tree-Shaking?
