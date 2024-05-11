# Learn Color: Notes and Tips

Course's URl: [Learn Color](https://web.dev/learn/css/color)

## 0. Primary Colors

> There are two disciplines that define primary colors: Arts and Physics.

The concept varies between disciplines due to their respective purposes and approaches to color mixing.

### 0a. Primary colors in Art

> RED, BLUE and YELLOW.

- Based in the **subtractive color model** where colors are created sustracting wavelengths of light.
- In this model, mixing primary colors together creates secondary colors (orange, green, and purple), and mixing those creates tertiary colors.
- Artists historically used pigments like red ochre, lapis lazuli, and yellow ochre, which naturally occur and were readily available. This system is intuitive for painters because it reflects how pigments interact with light and how colors are mixed on a canvas.

### 0b. Primary Colors in Physics

> RED, GREEN and BLUE (RGB)

- Based on the **additive color model**, where colors are created by adding wavelengths of light.
- In this model, combining the primary colors of light at full intensity creates white light while having all primary colors at zero intensity creates black.

  > [!NOTE] Definition: White color
  > White light contains all the wavelengths of visible light in the spectrum.

- Mixing different combinations produces various colors.
- Devices like TVs, computer monitors, and projectors use this model because they emit light.
- The RGB model is used because it closely corresponds to how human vision works; our eyes have receptors sensitive to red, green, and blue light.

> [!NOTE] Definition: CONES
> Cones are a type of photoreceptor cell in the retina. They give us our color vision.
> The retina has approximately 120 million rods and 6 million cones.
> There are three types of cone cells:
>
> - Red-sensing cones (60 percent)
> - Green-sensing cones (30 percent)
> - Blue-sensing cones (10 percent)

---

> [!NOTE] Definition: Additive Color Model (RGB)
> Method of color representation and reproduction where colors are created by combining different intensities of light.
>
> In this model, colors are formed by adding various wavelengths of light together.
>
> Key aspects of the additive color model include:
>
> - Color Mixing: When different intensities of red, green, and blue light are combined, they interact by adding their respective wavelengths together. This additive process results in the perception of various colors. For example, combining red and green light produces yellow light, while combining all three primary colors at full intensity creates white light.
> - Brightness Control: The intensity or brightness of each primary color can be adjusted independently, allowing for precise control over the resulting color. By varying the intensity of each primary color, a wide range of colors and shades can be achieved.
> - Color Representation: The additive color model is commonly used in electronic displays such as TVs, computer monitors, LED screens, and other digital devices. These devices emit light and use combinations of red, green, and blue light to create images and colors that are perceived by the human eye.

## 1. CSS' `<color>` data type

The CSS Color Specification defines the `<color>` data type and other types which relate to color in CSS.

- How do you decide which color type to use?
- How do you make your colors semi-transparent?

CSS has various different data types, such as strings and numbers. Color is one of these types and uses other types, such as numbers for its own definitions.

## 2. Numeric colors

### 2.1 Hex Colors

Hexadecimal notation (often shortened to hex) is a shorthand syntax for RGB, which assigns a numeric value to red green and blue, which are the three primary colors.

```text
The hexadecimal ranges when used in a six digit sequence are translated to the RGB numerical ranges which are 0-255 which correspond to the red, green, and blue color channels respectively.
```

```css
h1 {
  color: #b71540;
}

//translation hex to decimal
b7 -> b - 7 -> 16*11 + 7 = 183 red channel
15 -> 1 - 5 -> 16*1 + 5 = 21 green channel
40 -> 4 -0 -> 16*4 + 0 = 64 blue channel
(A redish color)

//other translations
--Max value--
FF -> 16*15 + 15 = 255
--Min Value--
00 -> 16*0  + 0 = 0
```

> [!NOTE] DEFINITION: Hexadecimal
> The hexadecimal number system is a type of number system that has a base value equal to 16. It is also pronounced sometimes as ‘hex’.
>
> Hexadecimal numbers are represented by only 16 symbols. These symbols or values are 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E and F. Each digit represents a decimal value. For example, D is equal to base-10 13.

#### Alpha Values

You can also define an alpha value with any numerical colors. An alpha value is a percentage of transparency. In hex code, you add another two digits to the six digit sequence, making an eight digit sequence.

Alpha channel in RGB [0, 255]

```text
0% alpha—which is fully transparent—is 00
100% alpha -fully opaque- is FF
50% alpha is 80 (8*16+0 = 128 )
75% alpha is BF (11*16+ 15 = 191)
```

### 2.2 RGB(Red, Green an Blue)

> RGB colors are defined with the rgb() color function.

Uses either numbers or percentages as parameters.

The numbers need to be within the 0-255 range and the percentages are between 0% and 100%‌. RGB works on the 0-255 scale, so 255 would be equivalent to 100%, and 0 to 0%.

```css
h1 {
  color: rgb(183, 21, 64);
}
```

Some colors

```text
Black: rgb(0 0 0)
White: rgb(100%, 100%, 100%) or rgb(255,255,255)
```

#### Alpha channel in rgb()

The alpha can be defined with a percentage or a decimal between 0 and 1.

> use the rgba() function

```text
Black 50% transparent: rgba(0,0,0,0.5)
```

> [!IMPORTANT] IMPORTANT: Comma and space separator are the same
> rgb(0 ,0 ,0 ) === rgb (0 0 0 ) // true
>
> Commas were removed from the rgb() and hsl() notation because newer color functions, such as lab() and lch() use spaces instead of commas as a delimiter.
>
> For better backwards compatibility, you can still use commas to define rgb() and hsl().

### 2.3 HSL (Hue, Saturation, Lightness)

```css
h1 {
  color: hsl(344, 79%, 40%);
}
```

HSL stands for hue, saturation and lightness.

#### 2.3a The HSL Color Model

The hue, saturation, and lightness (sometimes luminance) model originally was introduced by Joblove and Greenberg as hue/chroma/intensity.

- It is an additive color model just like the RGB model.

- It has its color values, and its **color wheel**.

- When it comes to creating color harmony, the HSL wheel can be used as a base to find the right colors.

> [!NOTE] DEFINITION: Hue (español: Matiz)
> Hue determines the basic color family of a particular color, such as red, orange, yellow, green, blue, or purple.
>
> Represents the position on the color wheel in the HSL color model.
>
> Hue is measured as angles (in degrees) of the color wheel [0°, 360°]
>
> ```text
> 0° = 360* is Pure Red
> 25° a Shade of Red.
> 60° is Pure Yellow
> 120° is Pure Green
> 180° is Pure Cyan
> 240° is Pure Blue
> 270 is Pure purple
> 300° is a shade of purple
> ```

---

> [!NOTE] DEFINITION: Saturation
> Saturation refers to the intensity or **purity** of a color. It determines how vivid or dull a color appears.
>
> Saturation is measured as a percentage [0%, 100%]
>
> ```text
> 0% saturation represents a shade of gray (no color)
> 100% saturation represents the purest form of the color
> ```

---

> [!NOTE] DEFINITION: Lightness (luminosidad)
> Lightness refers to the perceived brightness of a color.
>
> It determines how light or dark a color appears, independent of its hue and saturation.
>
> Lightness is measured as a percentage [0%, 100%]
>
> ```text
>  0% lightness represents black
>  50% lightness represents the "normal" color
>  100% lightness represents white.
> ```
>
> Increasing the lightness value makes the color lighter, while decreasing it makes the color darker.

#### 2.3b Alpha Channel

Alpha is defined in hsl() in the same way as rgb(); by adding a / after the hue, saturation and lightness parameters or by using the hsla() function.

The alpha can be defined with:

- A percentage between [0%, 100%]
- A decimal between [0, 1]

## 3. Color Keywords

There are 148 named colors in CSS. These are plain English names such as `purple`, `tomato` and `goldenrod`.

Aside from standard colors, there are also special keywords available:

- `transparent` is a fully transparent color. It is also the initial value of background-color

- `currentColor` is the contextual computed dynamic value of the color property. If you have a text color of red and then set the border-color to be currentColor, it will also be red. If the element that you define currentColor on doesn't have a value for color defined, currentColor will be computed by the cascade instead.
