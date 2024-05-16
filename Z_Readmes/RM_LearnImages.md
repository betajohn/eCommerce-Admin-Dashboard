# Learn Images Course: Notes and Tips

Course's URl: [Learn Images](https://web.dev/learn/images)

## 1. A brief history of images on the web

### 1a. The `<img>` element

> embeds an image into the document.

Launched in Netscape (“Mosaic,” at the time) in 1993 and added to the HTML specification in 1995.

```html
<img src="" alt="" />
```

- The src attribute is required, and contains the path to the image you want to embed.
- The alt attribute holds a textual replacement for the image, which is mandatory and incredibly useful for accessibility --screen readers read the attribute value out to their users so they know what the image means. Alt text is also displayed on the page if the image can't be loaded for some reason: for example, network errors, content blocking, or linkrot.

> [!NOTE] Definition: LINKROT
> The deterioration of hyperlinks overtime.

Since `<img>`'s invention, the fundamentals of working with images haven't changed.

- Use a web-friendly image format for compatibility.
- Use sensible compression to conserve bandwidth.
- Use dimensions that suit the space the image is going to occupy in the page's layout.

### 1b. Raster Images

> [!NOTE] Definition: RASTER
> (spanish: ráster)
> A pattern of closely spaced rows of dots that form an image (as on the cathode-ray tube of a television or computer display)

Raster images can be thought of as a set of pixel-by-pixel instructions for rendering a two-dimensional grid. Common raster image formats include GIF (.gif), JPEG (.jpg), PNG (.png), and WebP (.webp)

The way each image format compresses and encodes these instructions differs, resulting in a huge variance between file sizes.

```text
-Example-
Image in JPG format = 200kb
Same image in PNG format = 4mb
```

> A raster image source scaled beyond its inherent dimensions will appear distorted, blocky, or blurred.

Just like choosing between raster and vector images, choosing the appropriate type of raster image ultimately comes down to the use case

### 1c. Images in responsive design (downscaling)

To make an image flexible, developers starting using css `max-width:100%` to tell the browser's rendering engine to prevent an image from overflowing its parent container.

```text
When rendering engines are given more image data than necessary for the space the image occupies in a layout, they are able to make informed decisions about how to render the reduced image, and can do so without introducing any visual artifacts or blurring.
```

> downscaling a raster image is visually seamless

You wouldn't typically want to upscale an image—that is, render the `<img>` at a size larger than the intrinsic size of the source image. The displayed image would appear blurry and grainy-looking.

```text
Sending a bigger image for the client to downscale works perfectly visually but from a efficiency perspective is bad. It comes at a huge performance cost.
```

As `<img>` only supported a single source for the image data, this approach required us to provide an image asset with an intrinsic size as large as the largest size at which it could be displayed.

With `width:100%`, sending The same image for a desktop and a mobile client has equal effect **visually** but for the smaller screen where width is considerably smaller, it comes at the cost of burning through a huge amount of bandwidth and processing power with no tangible benefit.

Things got much worse with the advent of the first "Retina" devices, as display density became a concern alongside viewport size. An image source needs a much larger intrinsic width in order to suit a high density display.

On a high-density display, an image displayed at its intrinsic size will look slightly grainy. Scaled down by 50%, the same image source will look much sharper.

```text
A huge, high resolution image source rendered on a small, low density display will look like any other small, low density image, but feel far slower. The user will be left bearing all the performance costs of that massive, 4000px-wide image source, to no benefit.
```

## 2. Key Performance Issues

> Images are the web's biggest assets

```text
As it stands now, images are the web's biggest assets in terms of both total transfer size and number of requests per page. The median webpage's total transfer size is roughly 2MB, as of June 2022, with images alone accounting for nearly half of that.
```

It's no exaggeration to say that **optimizing image requests may be the single biggest performance optimization you can make**.

### 2a. Deferring image requests

#### The loading='lazy' attribute

Defers loading the image until it reaches a calculated distance from the viewport, as defined by the browser.
**Deferring images from the initial page load**.

```html
<img src="image.jpg" loading="lazy" alt="…" />
```

**There's a catch**: deferring those requests means not taking advantage of browsers' hyper-optimized processes for requesting images as early as possible. If loading="lazy" is used on img elements toward the top of the layout—and thus more likely to be in the user's viewport when the page is first loaded—these images can feel significantly slower to the end user.

### 2b. Fetch priority

The loading attribute is an example of a larger web standards effort to give developers more power over how web browsers prioritize requests.

If the value of a loading attribute on an `<img>` is 'lazy', the associated image request will be deferred until the browser determines that it will be shown to a user. Otherwise, that image will have the same priority as any other image on the page.

Each resource has a default priority: **Browsers assign resources (css, scripts, images) a fetch priority so they can be downloaded in optimal order**.

```text
A resource's priority usually depends on what is it and where is it located in the document (priority goes from top to bottom).

Automatic priority assignment usually works well but there are use cases where the assigned order is not optimal.
```

#### The HTMLImageElement fetchPriority attribute

> Represents a hint given to the browser on how it should prioritize the fetch of the image relative to other images.

```html
<img src='' alt='' loading ='' fetchPriority = {'high'| 'low' | 'auto'} />`
```

- high: Fetch the image at a high priority relative to other images.
- low: Fetch the image at a low priority relative to other images.
- auto: Default mode, which indicates no preference for the fetch priority. The browser decides what is best for the user.

```text
USE: ADJUST A PAGE'S DOWNLOAD ORDER TO OPTIMIZE PERFORMANCE AND CORE WEB VITALS.
```

Optimization example:

- fetchPriority='low' -> Set it for images only revealed following user interaction such as secondary carousel images.
- fetchPriority='high' -> Set it for images you know will be inmediately visible in the viewport such as carousel's main image.

> [!NOTE] Difference between property and attribute in html
> Html attributes are declared when writing html.
>
> Properties belong to objects, not to html.
>
> When the browser creates the DOM out of html code, each html element becomes an object with properties. Most of the properties correspond to a html attribute. Properties can be accessed via javascript.

### 2c. Web Vitals - Largest Contentful Paint (LCP)

LCP is a core web vital metric for **measuring perceived load speed**.

```text
There are plenty of older indicators but a more accurate way to measure when the main content of a page is loaded is to look at when the largest element is rendered.
```

Definition:

> LCP reports the render time of the largest image or text block visible in the viewport, relative to when the user first navigated to the page.

**Ideal Score:** Aim to a LCP time of 2.5 seconds or less.

> [!NOTE] Real Life Data: Bodafone's experience on reducing LCP
> A 31% improvement in LCP time led to:
>
> - 8% more sales
>
> - 15% improvement in number of visitors who became prospective customers (visitor-to-lead rate improvement)
>
> - 11% improvement in the number of users who visited their cart (cart-to-visit rate)

In over 70% of webpages **the largest element in the initial viewport involves a image**.

### 2d. Measuring the impact of images in a webpage with Core Web Vitals

- Core Web Vitals are focused on user's direct experience of a webpage.

- Core Web Vitals determine how fast an experience feels to the user.

**Perceived performance** is more important and more difficult to measure than total transfer size alone.

> [!NOTE] DEFINITION: Splash Screen
> The very first screen the user sees when opening up an app on a mobille device (or webpage). Appears while the app is loading, just after the user opened the app.
>
> It's also called Launch Screen.
>
> Consists of a logo, name or slogan related to the poroduct.

### 2e. Web Vitals - Cumulative Layout Shift (CLP)

> A measurement of visual stability

```text
A metric for capturing how much the layout of the content of a page shifts (moves) as assets are loaded and the page is rendered.
```

> [!IMPORTANT] HTMLImageElement's width and heigh attributes
> `<img src='...' alt='...' width='400' height='200'>`
>
> In the past, they used to indicate the dimensions of an image.
>
> Since 2019 `width` and `height` work differently. Now the browser uses them to get the aspect ratio of the images.
>
> Browsers determine the aspect ratio of images prior to the rendering of the page. The browser uses the `width` and `height` attributes to reserve the space the image will occupy as layout is rendered.
>
> Always use `width` and `height` attributes on your `<img>` elements!
>
> CSS styles will override these values.

This approach -always setting the `width` and `heigh` attributes will contribute to reducing cumulative layout shift scores!

## 3. Vector Images

Vector graphics are a method of communicating a series of shapes, coordinates, and paths to their rendering context. They are a set of instructions for how an image should be drawn.

> When a vector image is scaled up or down, it is redrawn to scale. It doesn't lose fidelity!

### 3a. SVG (Scalable Vector Graphic)

SVG is a XML-based markup language developed by the W3C.

SVG is a vector image format designed for the modern web.

- A SVG can be styled with CSS or contain javascript.
- The descriptive information contained within an SVG source is often highly compact compared to raster image formats (GIF, PNG, JPEG).
- The descriptive nature of SVG requires more interpretation -more thinking- from the browser. Complex SVGs can be more taxing to render.

> [!NOTE] DEFINITION: Raster (español: raster)
> Scan pattern in which an area is scanned from side to side in lines from top to bottom.

## 4. Raster Images

A set of pixel-by-pixel instructions for rendering a two-dimensional grid.

Examples of raster images are GIF, PNG, JPEG, WebP.

The way each format compresses and encodes these instructions differs, resulting in a huge variance between file sizes.

> unlike vector images, a raster image source scaled beyond its inherent dimensions appears distorted, blocky or blurred.

What do they mean by encoding differences?

- Methods used to describe its contents.
- Compression methods (or lack thereof).

```text
Choosing the correct format and settings for image compression is an exercise of finding balance between the level of visual detail we're able to perceive and the amount of data sent to the browser.
```

> [!NOTE] DEFINITION: Lossy compression
> Any compression method that reduces the size of a file by permanently discarding some of its data, resulting in a loss of image quality.
>
> Information that is considered not essential to human perception such as high-frequency details or subtle color variations is selectively removed.

---

> [!NOTE] DEFINITION: Run-Length encoding
> A simple form of data compression where consecutive identical data values are replaced with a count and single values.
>
> example: 'AAAABBBCCAA' -compression--> '4A3B2C2A'

---

> [!NOTE] DEFINITION: LossLess compression
> Any compression method that reduces file size without sacrificing image quality.
>
> Example: PNG

## 5. GIF Image Format (Graphical Interchange Format)

Has a viewport called **logical screen** to which individual frames of image data are drawn.

Offers a flipbook-like animation: A single frame is drawn in the logicl screen then replaced by another and so on.

Uses a LossLess data compression method `Lempel-Ziv-Welch Algorithm`.

```text
Repeated strings of characters are saved to an internal dictionary, then another dictionary is created on top of it.

-First dictionary-
A: #0000FF
B: #FF0000
C: #00FF00

A C A A
A C B B
A A A B
A C C B

-Second dictionary-
Z: AA
Y: BB
X: CC
W: AC

W Z
W Y
Z A B
W C B
```

> GIF has a mayor limitation that severely impacts the quality of images; each frame drawn to the logical screen can only have a max of 256 colors.

- GIF format loses fidelity compared to the original image unless the original image already uses 256 colors.
- GIF supports indexed transparency.

> [!NOTE] DEFINITION: Indexed Transparency
> Technique used in computer graphics to render transparent objects.
>
> Unlike other forms of transparency where each pixel's transparency is calculated individually, indexed transparency works by assigning a specific index to certain areas of an image or object.
>
> In this technique, each pixel of an image is assigned an index value from a predefined palette of colors, with one of the indices reserved to represent transparency. This means that rather than storing alpha values (opacity) for each pixel individually, the transparency information is stored in a separate channel or map, often called an alpha channel or mask.

---

> [!NOTE] DEFINITION: Palette Quantization
> Process during compression where the color palette is reduced.
>
> The original continuous values (of colors) are are divided into intervals and each interval is represented by a single value.
>
> Note: Quantize (español: quantizacion) is the conversion of values from continuous to discrete.
>
> ```text
>  Simplified Example: Transforming a range of colors to a unique color.
>  #00DD00 <- [##00DD00, #00CC00]
>  Every color close to #00DD00 will be mapped to #00DD00
>  row 1 before ->  #00FF00 #00EE00 #00DD00 #00CC00 (a descending gradient)
>  row 1 after ->   #00DD00 #00DD00 #00DD00 #00DD00 (not  a gradient anymore)
>  which can be written as 4#00DD00 using Run-length enconding
> ```
>
> Results in a loss of detail and accuracy compared to the original (but reduces file size substantively)

---

> [!NOTE] DEFINITION: Fidelity
> Degree to which an image accurately reproduces the original source.
>
> Considers color accuracy, detail preservation and image quality.
>
> ```text
> high-fidelity: closely resembles the original source.
> low-fidelity: may exhibit noticeable artifacts, loss of detail or inaccuracies compared to the original source.
> ```

---

> [!NOTE] DEFINITION: Artifacts (in the context of image fidelity)
> Unwanted visual anomalies or distortions present in an image that degrade its quality or accuracy.
>
> These anomalies can be introduced during image capture, processing, compression, or transmission, and they often manifest as irregularities, noise, or distortions that are not part of the original scene.
>
> Common types of artifacts include Compression artifacts, Aliasing artifacts, Noise artifacts, Color artifacts and Motion artifacts.

## 6. PNG Image format (Portable Network Graphics)

Intended to be a replacement for GIF (due to problems with patents)

Similar to GIF in:

- Uses LossLess compression.
- Color palette may be quantized.

Types of PNGs:

- Truecolor PNG: Can display up to 16millions of colors which results in high-fidelity high-size files.
- Indexed-color PNG: Uses a palete of up to 256 colors just like GIF which results in low-fidelity low-size files.

- Grayscale PNG: Only contains shades of gray.
- Alpha PNG: Includes an alpha channel which allows transparency. The values of the alpha channel ranges from 0 (fully transparent) to 255 (fully opaque).

All the types of PNGs share the `.png` extension. The difference lies in encoding and compression.

```text
PNGs have excessively large sizes compared to modern web-friendly encodings.
Their transfer sizes mean they are almost never the right choice for photographic content.

In the modern web there is only one use case for PNGs: simple artwork that requires semi-transparency such as a company's logo.

SVG is superior in both scalability and file size.
```

## 7. JPEG Image format (Joint Photographic Experts Group)

> The most common type of image in the web

- Either `.jpg` or `.jpeg` are the same format.
- Uses lossy compression.
- Has been the right choice for image encodings for over 30 years since its creation in 1993.
- JPEG is well suited for layered gradients that make up real world photography.

JPEG's lossy compression is different

- More efficient with tiny, often imperceptible alterations to the image data.
- JPEG encodes image data a eight-by-eight blocks of pixels and **describes the blocks**, not the individual pixels inside them like legacy formats do.

```text
Describing a gradient pixel by pixel like PNG does is verbose thus file size increments.
Describing a gradient using JPEG's style encoding is MUCH more efficient thus lighter file sizes can be achieved.
```

- JPEG shines in quantizing the level of high-frequency detail of an image, often imperceptibly.

```text
Saving an image as JPEG reduces its quality in ways not perceptible for the human eye, unlike GIF where the reduction of colors is clearly visible.
```

- JPEG attempts to quantize an image source in a way that loosely matches the way our own psycho-visual systems do it.

> [!NOTE] DEFINITION: Layered Gradient
> Technique where multiple gradients are applied to an image, each affecting different areas or layers of the photography.
> Typically they are adjustments in brightness, contrast, color, etc.

---

> [!NOTE] DEFINITION: Layers (in the context of images & photography)
> Separate component or element within an image that can be individually edited or adjusted. Commonly used in post-processing software such as Photoshop or Gimp to organize and manipulate aspects of an image without affecting the original photograph.

---

> [!NOTE] DEFINITION: Frequency (in the context of images & photography)
> Frequency means the rate of change of intensity per pixel.
>
> Let’s say you have some region in your image that changes from white to black
>
> - If it takes many pixels to undergo that change, it’s low frequency.
>
> - The fewer the pixels it takes to represent that intensity variation, the higher the frequency.
>
> This is a VERY glib definition. Term is complex and comes from maths (Fourier analysis).

JPEG uses Discrete Cosine Transform which splits the image in two layers

- Luminance (brightness) -> Luma
- Chrominance (color) -> Chroma

Compression can become obvious if taken too far. Levels of detail can be reduced further than our psycho-visual systems would naturally ignore.

### 7a. Progressive JPEG (PJPEG)

PJPEG Reorders the process of rendering

- 'Baseline' JPEGs are rendered from top to bottom as the transfer progresses.
- Progressive JPEG breaks rendering into a set of full-sized 'scans'. With each scan increasing the quality of the image.

PJPEG Images load way faster but are blurry at the beginning and become clearer as transfer continues.

> For this reason, PJPEG feel faster to the end user

- PJPEG files are also smaller by a little.
- The price is that PJPEG are more taxing than regular JPEG for the browser during rendering (it's really minor and difficult to notice)

## 8. squoosh App

> An open-source image compression app created by GoogleChromeLabs designed specifically for compressing images.

squoosh's URl: [squoosh.app](https://squoosh.app/)

compression level range: [0,100]

```text
0:   Low Quality & High Compression.
100: High Quality & Low Compression.
```

## 9. WebP Image Format (Web Picture)

Excellent choice for both images and animated images. WebP offers much better compression than PNG or JPEG with support for higher color depths, animated frames, transparency etc.

- Developed by google to supersede JPEG
- Originally use Lossy compression, later updates introduced LossLess.
- Has PNG-like Alpha channel transparency.
- Has Gif-like animation.

Its compression algorithm is based on a method that VPB video codec uses to compress keyframes in videos.

- Similarly to JPEG, its compression algorithm operates in terms of 'blocks' rather than individual pixels. Its algorithm creates a division between `luma` and `chroma`.
- Unlike JPEG, WebP uses block prediction and adaptive block quantization.

As JPEG, you need to select a quality value when encoding. Ranges from [0,100]

### 9a. Google's cwebp

> Compress an image file to a WebP file

Input format can be either PNG, JPEG, TIFF, WebP or raw Y'CbCr samples. Note: Animated PNG and WebP files are not supported.

cwebp's URl: [libwebp](https://chromium.googlesource.com/webm/libwebp/)

## 10. AVIF Image format (AV1 Image File)

- Encoding based on the Open Source AV1 Video Codec.
- Newest format, supported browser wide just from 2022.
- A bit better than WebP in compression.
- Offers transparency and animation.

Good choice for both images and animated images due to high performance and royalty free image format.

It offers much better compression than PNG or JPEG with support for higher color depths, animated frames, transparency, etc.

Note that when using AVIF, you should include fallbacks to formats with better browser support (i.e. using the <picture> element).
Support: Chrome, Edge, Firefox (still images only: animated images not implemented), Opera, Safari.

> It's too new, prefer WebP.

## 11. Responsive Images

Responsive image markup can be divided into two scenarios:

- Descriptive Syntax: Situations where the goal is the most efficient possible image.
- Prescriptive Syntax: Situations where you need explicit control over what image source the browser selects.

## 12. Descriptive Syntaxes

Their purpose is to give the browser a choice of images so that it can make the best decisions about what to display.

These syntaxes allow the browser to solve a very difficult problem autonomously; seamlessly requesting and rendering an **image source tailored to a user's browsing context**, including viewport size, display density, user preferences, bandwidth, and countless other factors.

> [!NOTE] DEFINITION: Browsing Context
> A browsing context is an environment in which a browser displays a `Document`. In modern browsers it usually is a tab, but can be a window or even only parts of a page, like a frame or an iframe.
>
> Each browsing context has an origin (that of the active document) and an ordered history of previously displayed documents.
>
> Communication between browsing contexts is severely constrained. Between browsing contexts of the same origin, a `BroadcastChannel` can be opened and used.

---

> [!NOTE] DEFINITION: Screen Size vs Screen Resolution
> Screen Size:
>
> - Refers to the physical dimensions of the display, typically measured diagonally from one corner to the opposite corner.
> - It is usually expressed in inches (or occasionally in centimeters).
> - Screen size directly influences the physical size of the device, such as a smartphone, tablet, laptop, or monitor.
>
> Screen Resolution:
>
> - Refers to the number of pixels that the display can accommodate horizontally and vertically.
> - It is usually expressed as the total number of pixels in width by height, such as 1920x1080 or 2560x1440.
> - Screen resolution determines the level of detail and clarity of the displayed content. Higher resolutions typically result in sharper images and text.
> - A display with a higher resolution can accommodate more content on the screen without sacrificing clarity, compared to a display with a lower resolution of the same size.
>
> ```text
> Example: This monitor
> Screen size: 32 inches
> Screen resolution: 1600x900
> ```

---

> [!NOTE] DEFINITION: Pixel Density | Display Density | Screen Density
>
> - Measures the density of device pixels in a given physical area.
> - Commonly measured using pixels per inch (ppi).
>
> For many years, 96 ppi was a very common display density (hence CSS defining a pixel as 1/96th of an inch).
>
> Starting in the 1980s it was the default resolution of Windows. In addition, it was the resolution of CRT monitors.
>
> This began to change as LED monitors became common in the 2000s. In particular, Apple made a big splash in 2010 when it introduced Retina displays. These displays had a minimum resolution of 192 ppi.
>
> ```text
> Example
> iphone 4: 326 ppi (pixels per inch)
> Pixel 8a: 430 PPI
> High Definition Desktop Monitors: Monitors with resolutions of 1920x1080 pixels, also known as Full HD or 1080p, usually have pixel densities ranging from 90 to 110 PPI.
>
> -- Calculating this monitor's current ppi --
> This monitor's current resolution 1600x900
> This monitor's screen size 32''
> Calculating the pixel length of the hypotenuse
>  x^2 = 1600^2 + 900^2 => x = 1936 (aprox)
> calculating ppi
> x = (1936 pixels)/(32 inches) = 60.50 ppi
>
> -- Calculating this monitor's maximum ppi supported--
> This monitor's max resolution supported 1920x1080
> hypotenuse = (1920^2+1080^2)^0.5 = 2203 pixels
> ppi = 2203/32 = 68.8ppi
> ```

### 12a. The HTMLImageElement's `sizes` attribute

```tsx
<img sizes={value} />
```

Its value is one or more strings separated by commas, indicating a set of source sizes. Each source size consists of:

- A media condition. This must be omitted for the last item in the list.
- A source size value.

> [!NOTE] NOTE: Media Conditions
> Media Conditions describe properties of the viewport, not of the image.
>
> For example, `(max-height: 500px) 1000px` proposes to use a source of 1000px width, if the viewport is not higher than 500px.

### 12b. The HTMLImageElement's `srcSet` attribute

> `srcSet` isn't a method for swapping image sources at specific breakpoints, and it isn't meant to swap one image for another.

```tsx
<img arcSet={value} />
```

Its value is one or more strings separated by commas, indicating possible image sources for the user agent to use. Each string is composed of:

- A URL to an image.
- Optionally, whitespace followed by one of:
  - **A width descriptor** (a positive integer directly followed by w). The width descriptor is divided by the source size given in the sizes attribute to calculate the effective pixel density.
  - **A pixel density descriptor** (a positive floating point number directly followed by x).

> [!NOTE] DEFINITION: User Agent
> A user agent is a computer program representing a person, for example, a browser in a Web context.
>
> Besides a browser, a user agent could be a bot scraping webpages, a download manager, or another app accessing the Web.
>
> Along with each request they make to the server, browsers include a self-identifying `User-Agent` HTTP header called a user agent (UA) string. This string often identifies the browser, its version number, and its host operating system.
>
> Spam bots, download managers, and some browsers often send a fake UA string to announce themselves as a different client. This is known as user agent spoofing.
>
> The user agent string can be accessed with JavaScript on the client side using the `Navigator.userAgent` property.
>
> ```text
> //userAgent property returns the user-agent header sent by the browser to the server on every request.
> //The userAgent property is read-only.
> // The specification asks browsers to provide as little information via this field as possible.
>
> let x =  navigator.userAgent
> console.log(x) //prints
>  'Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.109 Safari/537.36 CrKey/1.54.248666'
> ```

### 12c. Describing density with `x`

An `<img>` with a fixed width will occupy the same amount of the viewport in any browsing context, regardless of the density of a user's display.

For example, an image with an inherent width of 400px will occupy almost the entire browser viewport on both the original Google Pixel and much newer Pixel 6 Pro—both devices have a normalized 412px logical pixel wide viewport.

> [!NOTE] DEFINITION: Physical Pixel (Device Pixel)
>
> The actual hardware pixel, its total number is determined by hardware specifications.
>
> - It's literally what comes printed in the box.
>   - Example: A FULL HD screen with a printed `1920 x 1080` resolution has a total of 1920x1080 physical pixels.
>
> **Getting the physical resolution in JS**
>
> We **CAN'T** know the actual physical resolution that comes printed on the box where our screen came from.
>
> What we can know is the resolution used by the Operative System via the `window.screen` property.
>
> ```tsx
> // getting physical resolution out of the box
> let physicalScreenWidth = window.screen.width; // prints 1920
> let physicalScreenHeight = window.screen.Height; // prints 1080
> // getting physical resolution after changing screen resolution at operative system level
> // -> changed Microsoft Window's screen settings to 'screen resolution: 1600x900'
> let physicalScreenWidth = window.screen.width; // prints 1600
> let physicalScreenHeight = window.screen.Height; // prints 900
> ```

---

> [!NOTE] DEFINITION: Logical Pixel (CSS Pixel)
>
> Also known as CSS Pixel, Virtual Pixel or Density Independent Pixel.
>
> CSS pixel Is just a standardization for the web. Intended to have a **common pixel length among different screen resolutions**.
>
> CSS pixels are device independent and let us not have to worry about physical sizes of the screens and the display densities etc.
>
> Unlike physical pixels, **logical pixels are not directly tied to the hardware of the display**. Logical pixels are roughly the same visual size across devices.
>
> - In high-density displays, multiple physical pixels may correspond to a single logical pixel.
> - In low-density displays, multiple logical pixels may be represented by a single physical pixel.
>
> ```tsx
> //getting the 'physical resolution (width)'
> let physicalScreenWidth = window.screen.width; // prints 1600
> // Getting the CSS Pixel resolution (width) of the viewport at full screen
> let physicalScreenWidth = window.screen.width; // prints 1600
> const CSSScreenWidth = window.innerWidth; //  prints 1600 -> viewportWidth
> //  // Getting the CSS Pixel resolution (width) of the viewport at full screen
> // after zooming in to 110% at browser level
> let physicalScreenWidth = window.screen.width; // prints 1600
> const CSSScreenWidth = window.innerWidth; // 1455
> //  // Getting the CSS Pixel resolution (width) of the viewport at full screen
> // after zooming in to 150% at browser level
> let physicalScreenWidth = window.screen.width; // prints 1600
> const CSSScreenWidth = window.innerWidth; // 1067
> ```

---

> [!NOTE] DEFINITION: Device Pixel Ratio (dpr)
>
> ```text
> devicePixelRatio is a property that can be used to know how many of a device screen’s physical pixels are used to draw a single CSS pixel.
> ```
>
> DPR is the ratio of the resolution in physical pixels to the resolution in CSS pixels.
>
> `dpr = physical pixel /CSS pixel =  screen.width / window.innerWidth`
>
> Can be accessed via javascript with the `window.devicePixelRatio` property.
>
> - `window.devicePixelRatio` changes when zooming-in or Zooming-out.
>
> ```tsx
> //on this desktop monitor
> console.log(window.devicePixelRatio); // prints 1
>
> //zooming-in at browser level (chrome) to 110%
> console.log(window.devicePixelRatio); // prints 1.1
> // why?? Because DPR is calculated  this way
> const dpr = screen.width / window.innerWidth;
> ```
>
> `window.innerWidth` is the viewport's width in CSS Pixels.
>
> `screen.width` is the device's width in Physical Pixels.
>
> Zooming-in 10% reduces `window.innerWidth` from `1600 CSS Pixels` to `1455 CSS Pixels` while physical width remains constant.
>
> ```text
> How zooming in 10% affects DPR
> DPR = screen.width / window.innerWidth
> 1600/1600 => DPR = 1 --10% zoom-in--> 1455/1600 => DPR = 1.10
> ```

Both devices have the same screen width in terms of css Pixels but their physical resolutions are different.

| Model       | Physical Resolution | Logical Resolution (width) | DPR            |
| ----------- | ------------------- | -------------------------- | -------------- |
| Pixel 6 Pro | 1440 × 3120 pixels  | 412 CSS Pixels             | 3.5 (1440/412) |
| Pixel       | 1080 × 1920 pixels  | 412 CSS Pixels             | 2.6 (1080/412) |

DPRs >= 2 are a HUGE improvement on resolution compared to desktop's DPR of 1.

### What happens when the same image is displayed in 2 devices with different DPR?

For example, a `100px x 50px` image

- Will be draw by 5000 physical pixels (100x50) on a 1 DPR device (this monitor)
- Will be drawn by 20000 physical pixels (200x100) on a 2 DPR device (my phone)
- Both images will still be 100x50 `CSS pixels`

That's 4 times more pixels!!

```text
So, what happens to the image?

- Will look OK on a 1 DPR device.

- A 100 x 50 raster image will need to be upscaled when displayed on a 2 DPR Device in order to fill the 100 CSS pixel width, and this upscaling will make it look bad.
```

In order to prevent this upscaling, the image being rendered has to have an intrinsic width of at least `200 pixels` to:

- Fill 100 CSS Pixels on a 2DPR screen just with its intrinsic width
- Be downscaled to fit into a 100CSS Pixels on 1 DPR screens.

The problems with always serving the highest resolution image:

1. High resolution image source rendered on a small, low density display will look like any other small, low density image, but **feel far slower**.

2. They'll come at a much higher bandwidth and processing cost.

> [!IMPORTANT] mobile devices with a DPR of 1 are vanishingly rare
> According to data shared by Matt Hobbs, approximately 18% of GOV.UK browsing sessions from November 2022 report a DPR of 1.

### Using `srcSet` attribute to optimize the serving of images

Using `srcset` ensures that only devices with high-resolution displays receive image sources large enough to look sharp, without passing that same bandwidth cost along to users with lower-resolution displays.

The `srcset` attribute identifies one or more comma-separated **_candidates_** for rendering an image.

Each **_candidate_** is made up of two things:

- A URL (just like you would use in `src`).
- A syntax that describes that image source.

Each candidate in `srcset` is described by its inherent width ("w syntax") or intended density ("x syntax").

```text
The x syntax is a shorthand for "this source is appropriate for a display with this density".

A candidate followed by 2x is appropriate for a display with a DPR of 2.
```

#### So, what do we mean by describing the density with `x`?

```tsx
<img src="low-density.jpg" srcset="double-density.jpg 2x" alt="...">
```

Browsers that support `srcset` will be presented with two candidates:

1. `double-density.jpg`, which 2x describes as appropriate for displays with a DPR of 2
2. `low-density.jpg` in the src attribute. (Selected if nothing more appropriate is found on `srcset`)

For browsers without support for srcset, the attribute and its contents will be ignored—the contents of src will be requested, as usual.

- `srcset` doesn't tell the browser how to use that source, just informs the browser how the source could be used.

  - "This is a double density image, not an image for use on a double density display"

- Display density is only one of a huge number of interlinked factors that the browser uses to decide on the candidate to render

### 12d. Describing widths with w

`srcset` accepts a second type of descriptor for image source candidates. the `w` syntax describes the inherent width of each candidate source.

Let's say you want the user's browser to choose between two candidates:

- small.jpg, a source with an inherent width of 600px.
- large.jpg, a source with an inherent width of 1200px.

```tsx
<img src="..." srcset="small.jpg 600w, large.jpg 1200w" />
```

```text
Remember

This doesn't tell the browser what to do with this information, just supplies it with a list of candidates for displaying the image.

Before the browser can make a decision about which source to render, you need to provide it with a little more information: a description of how the image will be rendered on the page. To do that, use the **sizes** attribute.
```

### 12e. Describing usage with HTMLImageElement's `sizes` attribute

Values that the `sizes` attribute admits:

```text
The source size value is a CSS <length>. It may be specified using font-relative units (such as em or ex), absolute units (such as px or cm), or the vw unit.
```

Browsers are incredibly performant when it comes to transferring images. Requests for image assets will be initiated long before requests for stylesheets or JavaScript (oftentimes even before the markup has been fully parsed).

When the browser makes these requests, it has no information about the page itself, apart from the markup—it may not have even initiated requests for external stylesheets yet.

It only has browser-level information: the size of the user's viewport, the pixel density of the user's display, user preferences, and so on.

All this doesn't tell us anything about how an image is intended to be rendered in the page layout. So we need to provide the browser with this information and do it using markup.

**Like `srcset`, `sizes` is intended to make information about an image available as soon as the markup is parsed.**

the `sizes` attribute is shorthand for "here is the size of the rendered image in the layout".

```text
The way you describe the image is relative to the viewport —> viewport size is the only layout information the browser has when the image request is made.
```

```tsx
<img
 sizes="80vw"
 srcset="small.jpg 600w, medium.jpg 1200w, large.jpg 2000w"
 src="fallback.jpg"
 alt="...">
```

Here, this sizes value informs the browser that the space in our layout that the img occupies has a width of 80vw. Remember, this isn't an instruction, but a **description** of the image's size in the page layout. The rest is up to the browser.

### 12d. How the browser uses `sizes` & `srcset` to determine what image to request

Let's say this image will be rendered on a `1000px width Desktop viewport with a DPR of 1`:

1. Browser Calculates width of the image.

   `sizes="80vw"` informed the browser that this image will take 80% of the available viewport.

   ```text
    1000px* 80% = 800px
    // A 800 CSS pixels width image is be required
   ```

2. Browser uses the required width and divides it against the widths of each **candidate** in `srcset` to obtain each candidates's `'calculated image DPR'`.

   `srcset="small.jpg 600w, medium.jpg 1200w, large.jpg 2000w"`

   ```text
   -source 1: "small.jpg 600w"
    600/800= 0.75

   -source 2: "medium.jpg 1200w"
    1200/800= 1.5

   -source 3: "large.jpg 2000w"
   2000/800= 2.5
   ```

   The results of those calculations (.75, 1.5, and 2.5) are, effectively, DPR options specifically tailored to the user's viewport size. Since the browser also has information on the user's display density at hand, it makes a series of decisions:

3. Browser compares viewport's DPR to the results of the previous calculation.
   | `srcset` option | image DPR | viewport DPR | needs upscaling ?|
   | ---------------- | ----------| ------------ |----|
   | "small.jpg 600w" | 0.75 | 1 | yes|
   |"medium.jpg 1200w"| 1.5 | 1 | no |
   | "large.jpg 2000w"| 2.5 |1 | no|

Upscaling an image is not an option (because it loses quality) so those that would need upscaling are discarded. Then the browsers chooses the `image DPR` closest to `browser DPR`.

`"medium.jpg 1200w"` is the best option.

#### 12d1. How the chosen image changes when rendered on another client with a `600px width 1DPR viewport`

1. Browser Calculates required width of the image.

   ```text
   80% * 600px = 480px
   ```

2. Calculating each candidates's `calculated image DPR`

   `srcset="small.jpg 600w, medium.jpg 1200w, large.jpg 2000w"`

   ```text
   -source 1: "small.jpg 600w"
    600/480= 1.25

   -source 2: "medium.jpg 1200w"
   1200/480= 2.5

   -source 3: "large.jpg 2000w"
   2000/480= 4.17
   ```

3. Browser compares viewport's DPR to the results of the previous calculation.
   | `srcset` option | image DPR | viewport DPR | needs upscaling ?|
   | ---------------- | ----------| ------------ |----|
   | "small.jpg 600w" | 1.25 | 1 | no|
   |"medium.jpg 1200w"| 2.5 | 1 | no |
   | "large.jpg 2000w"| 4.17 |1 | no|

`"small.jpg 600w"` is the best option.

#### 12d2. How the chosen image changes when rendered on another client with a `600px width 2.3 DPR viewport`

Steps 1 & 2 are the same.

step 3:

Browser compares viewport's DPR to `Calculated image DPR`
| `srcset` option | image DPR | viewport DPR | needs upscaling ?|
| ---------------- | ----------| ------------ |----|
| "small.jpg 600w" | 1.25 | 2.3 | yes|
|"medium.jpg 1200w"| 2.5 | 2.3 | no |
| "large.jpg 2000w"| 4.17 |2.3 | no|

`"medium.jpg 1200w"` is the best option.

> [!IMPORTANT] Image size has been optimized
> The chosen image will look **identical** in all of these browsing contexts: all our source files are exactly the same apart from their dimensions, and each one is being rendered as sharply as the user's display density will allow. However, instead of serving `large.jpg` to every user in order to accommodate the largest viewports and the highest density displays, **_users will always be served the smallest suitable candidate_**.

#### 12d3. Express `sizes` of your `srcset` images using a combination of units

We can use `calc()` inside `sizes` value.

Any browser with native support for responsive images will support calc() as well, allowing us to mix-and-match CSS units—for example, an image that occupies the full width of the user's viewport, minus a 1em margin on either side:

```html
<img
  sizes="calc(100vw-2em)"
  srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1600w, x-large.jpg 2400w"
  src="fallback.jpg"
  alt="..."
/>
```

### 12e. Describing breakpoints

`sizes` attribute accepts a comma-separated set of candidates for the rendered size of the image. Those conditions use the familiar media query syntax.

This syntax is first-match: as soon as a media condition matches, the browser stops parsing the sizes attribute, and the value specified is applied.

Say you have an image

- occupy 80% of the viewport minus one em of padding on either side
- on viewports above 1200px occupies the full width of the viewport.

```html
<img
  sizes="(min-width: 1200px) calc(80vw - 2em), 100vw"
  srcset="small.jpg 600w, medium.jpg 1200w, large.jpg 2000w"
  src="fallback.jpg"
  alt="..."
/>
```

```text
The source-selection algorithm encoded in the HTML specification is explicitly vague on how a source should be chosen.

Once the sources, their descriptors, and how the image will be rendered has all been parsed, the browser is free to do whatever it wants—you can't know for certain which source the browser will choose.
```

### 12f. Why let the browser decide?

Device Pixel Ratio is **never** the most important variable. For example:

- You might be browsing internet from the newest phone while connected to an airplane's shaky wifi.
- Having data-saving mode activated.
- etc.

Would you still want to get the image with the highest possible definition?

Leaving the final say to the browser allows for far more performance improvements than we could manage with a strictly prescriptive syntax.

```text
For example: in most browsers, an img using the srcset or sizes syntax will never bother requesting a source with smaller dimensions than one that the user already has in their browser's cache.

What would be the point in making a new request for a source that would look identical, when the browser can seamlessly downscale the image source it already has?

But if the user scales their viewport up to the point where a new image is needed in order to avoid upscaling, that request will still get made.
```

## 13. Prescriptive Syntaxes (HTMLPictureElement)

The `<picture>` element doesn't render anything on its own, but instead acts as a decision engine for an inner `<img>` element, telling it what to render.

`<picture>` follows a precedent already set by the `<audio>` and `<video>` elements: a wrapper element that contains individual `<source>` elements.

```tsx
<picture>
   <source>
   <source>
    <img>
</picture>
```

What happens in old browsers?

- if the `<picture>` element isn't recognized by the user's browser, it's ignored (the `<source>` elements are then discarded as well).
- The inner `<img>` element will be recognized by any browser and its src will be rendered as expected.

### 13a. "Art directed" images with `<picture>`

What is 'art directed'?

> [!NOTE] DEFINITION: Art Directed Responsive Images
> Making changes to the content or aspect ratio of an image based on the size of the image in the page.

There are times, however, where you want to alter sources across breakpoints to better highlight the content.

You'll want the proportions of the image source to change. For example, a tighter zoom on the center of the image, and some of the detail at the edges cropped out.

Each `<source>` element has attributes defining the conditions for the selection of that `<source>`

- The HTMLSourceElement's `media` attribute accepts a media query.
- The HTMLSourceElement's `type` attribute accepts a media type (previously known as "MIME type").

The first `<source>` in the source order to match the user's current browsing context is selected, and the contents of the `srcset` attribute on that source will be used to determine the right candidates for that context.

Example: 2 different images

```tsx
<picture>
  <source media="(min-width: 1200px)" srcset="wide-crop.jpg">
  <img src="close-crop.jpg" alt="…">
</picture>
```

`<source>` will be selected only when viewport is at least 1200px wide and then `wide-crop.jpg` will be rendered.

`<img>` will be selected For viewports smaller than 1200 CSS pixels wide.

```text
You should always specify the inner img last in the order —if none of the source elements match their media or type criteria, the image will act as a "default" source
```

> [!IMPORTANT] HTMLPictureElement > conditional rendering
> `<picture>` Will only download the selected `source`.
>
> Conditional rendering will download **All** the options and only render one.
>
> - Remember that `<img>` requests occur before the download and parsing of css/JS.

---

> [!NOTE] NOTE: See what images are being downloaded using devTools
> devTools > network > `img` filter
>
> You can see:
>
> - type: PNEG, JPEG, etc.
> - Size
> - Request Status: 200 for ok
> - Time
> - Much More

Example 2: 3 different images

```ts
<picture>
   <source media="(max-width: 400px)" srcset="mid-bp.jpg">
   <source media="(max-width: 800px)" srcset="high-bp.jpg">
   <img src="highest-bp.jpg" alt="…">
</picture>
```

When a `<source>` is chosen based on the criteria you've specified, the `srcset` attribute on `<source>` is passed along to the `<img>` as though it were defined on `<img>` itself —meaning you're free to use `sizes` to optimize art directed image sources as well.

Example 3: Using `<img>`'s `sizes` to specify passed `srcset`'s width

```ts
<picture>
   <source media="(min-width: 800px)" srcset="high-bp-1600.jpg 1600w, high-bp-1000.jpg 1000w">
   <source srcset="lower-bp-1200.jpg 1200w, lower-bp-800.jpg 800w">
   <img src="fallback.jpg" alt="…" sizes="calc(100vw - 2em)">
</picture>
```

An image with proportions that can vary depending on the selected `<source>` element raises a performance issue: `<img>` only supports a single `width` and `height` attribute.

In order to account for this you can use `height` and `width` attributes on `<source>` elements.

Example 4: Using `<source>`'s `height` and `width` attributes to prevent Layout Shift

```ts
<picture>
   <source
      media="(min-width: 800px)"
      srcset="high-bp-1600.jpg 1600w, high-bp-1000.jpg 1000w"
      width="1600"
      height="800">
   <img src="fallback.jpg"
      srcset="lower-bp-1200.jpg 1200w, lower-bp-800.jpg 800w"
      sizes="calc(100vw - 2em)"
      width="1200"
      height="750"
      alt="…">
</picture>
```

Example 5: Using `<picture>` to decide what image to fetch based on user's theme preference.

```ts
<picture>
   <source media="(prefers-color-scheme: dark)" srcset="hero-dark.jpg">
   <img srcset="hero-light.jpg">
</picture>
```

### 13b. The HTMLSourceElement's `type` attribute

The type attribute allows you to use the `<picture>` element's single-request decision engine to only serve image formats to browsers that support them.

In the type attribute, you provide the `Media Type (formerly MIME type)` of the image source specified in the `srcset` attribute of each `<source>`.

> [!NOTE] MIME Image Types
> Files whose MIME type is image contain image data. The subtype specifies which specific image file format the data represents.
>
> - `image/apng`: Animated Portable Network Graphics (APNG)
> - `image/avif` : AV1 Image File Format (AVIF)
> - `image/gif`: Graphics Interchange Format (GIF)
> - `image/jpeg`: Joint Photographic Expert Group image (JPEG)
> - `image/png`: Portable Network Graphics (PNG)
> - `image/svg+xml`: Scalable Vector Graphics (SVG)
> - `image/webp`: Web Picture format (WEBP)

This provides the browser with all the information it needs to immediately determine whether the image candidate provided by that `<source>` can be decoded. If the media type isn't recognized, the `<source>` and all its candidates are disregarded, and the browser moves on.

Example: Using `<picture>` to provide two image types for cases where old browsers don't support the newest `WebP` image format.

```ts
<picture>
 <source type="image/webp" srcset="pic.webp">
 <img src="pic.jpg" alt="...">
</picture>
```

Here, any browser that supports `WebP` encoding will recognize the `image/webp` Media Type specified in the type attribute of the `<source>` element, select that `<source>`, and transfer and render `pic.webp`.

Any browser without support for `WebP` will disregard the source. The `<img>` will render the contents of src as it has done since 1992. You don't need to specify a second `<source>` element with `type="image/jpeg"` here, of course—you can assume universal support for `JPEG`.

All of this is achieved with a single file transfer and **no bandwidth wasted on image sources that can't be rendered**. No JavaScript, no server-side dependencies, and all the speed of `<img>`.

```text
<img> elements with the loading="lazy" attribute aren't requested until the layout of the page is known.

A sizes="auto" attribute has been proposed as an addition to the HTML specification to avoid the chore of manually-written sizes attributes in these cases.
```

## 14. Automatic Compression and Encoding
