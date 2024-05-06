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

The loading='lazy' attribute

Defers loading the image until it reaches a calculated distance from the viewport, as defined by the browser.
**Deferring images from the initial page load**.

```html
<img src="image.jpg" loading="lazy" alt="…" />
```

**There's a catch**: deferring those requests means not taking advantage of browsers' hyper-optimized processes for requesting images as early as possible. If loading="lazy" is used on img elements toward the top of the layout—and thus more likely to be in the user's viewport when the page is first loaded—these images can feel significantly slower to the end user.

### 2b. Fetch priority
