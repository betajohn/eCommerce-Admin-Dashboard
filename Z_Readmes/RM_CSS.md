# CSS notes and tips

## table element and children

### table

```text
The table-layout CSS property sets the algorithm used to lay out <table> cells, rows, and columns
```

values:

- auto

```text
The automatic table layout algorithm is used. The widths of the table and its cells are adjusted to fit the content. Most browsers use this algorithm by default.
```

- fixed

```text
The fixed table layout algorithm is used. When using this keyword, the table's width needs to be specified explicitly using the width property.

If the value of the width property is set to auto or is not specified, the browser uses the automatic table layout algorithm, in which case the fixed value has no effect.
```

## Flex

display:flex will change the behaviour of the h-full porperty of their children.
height will never be larger than flex parent if

### Manipulating size of children

- flex-grow

```text
The flex-grow property only works if there is space left in the parent container. It doesn't set the max size
to the "grow value".
se flex-shrink for this.

default value:
 flex-grow:0 //element will NOT grow by default
```

- flex-shrink

> [!IMPORTANT]
> Flex children will shrink by default if their heights are set to 100% of parents
>
> Even if they sum more than 100%!

```text
The flex-shrink property only works if the sum of the sizes of all the children is bigger than the parent's size.

default value:
 flex-shrink:1 //element will shrink by default if size set to 100% of parent.
```

Resizing

```css
flex-grow:0 // maintains original size
flex-grow:1 // adapts to parent
```

Example: Layout. Always use both!

```ts
//DashboardLayout.tsx

<div className"min-h-screen flex">
  <div className"flex-none h-screen fixed"> // won't shrink or grow because we want the Navbar size to be always the same.
    <Navbar/>
  </div>

  <div className"flex-grow min-h-full w-[600px]"> // will grow or shrink adjusting to the screen. Needs a starting size that's why w-[200px] is there!
    <TopVar/>
    {children}
  </div>
<div>
```

## width property

### Don't use w-screen

```text
Remember that by default every html box width will be equal to the screen minus the vertical scroll bar.

When setting the size to screen (100vw) it won't consider the scrollbar size thus element's width > screen-scrollBar width.
```
