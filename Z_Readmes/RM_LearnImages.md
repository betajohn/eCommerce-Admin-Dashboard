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

## 12 Descriptive Syntaxes

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

### 13c. Describing density with `x`

An `<img>` with a fixed width will occupy the same amount of the viewport in any browsing context, regardless of the density of a user's display.

For example, an image with an inherent width of 400px will occupy almost the entire browser viewport on both the original Google Pixel and much newer Pixel 6 Pro—both devices have a normalized 412px logical pixel wide viewport.

> [!NOTE] DEFINITION: Logical Pixel
> Also known as Device-Independent Pixels(DIP), Virtual pixels or CSS pixels.
>
> A logical pixel is the unit front-end developers work with in their CSS stylesheets and is also the unit designers work with in tools such as Figma or Photoshop.
>
> They’re referred as “logical”, as they simply just store information of a color represented in a given location, irrespective of the physical properties of the display.

---

> [!NOTE] DEFINITION: CSS Pixel
> The term `CSS pixel` is synonymous with the CSS unit of absolute length px — which is normatively defined as being exactly 1/96th of 1 CSS inch (in).
