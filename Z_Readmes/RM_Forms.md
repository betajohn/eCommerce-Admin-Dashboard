# Notes and tricks about creating forms with zod + react.hook-form

## Forms - General

Well-designed HTML forms are:

- Well-structured and semantically correct.
- Easy to use and navigate (keyboard).
- Accessible with ARIA attributes and proper labels.
- Has support for client and server side validation.
- Well-styled and consistent with the rest of the application.

## Zod

> Tiny: 8kb minified + zipped

Zod is a TypeScript-first schema declaration and validation library.

With Zod, you declare a validator once and Zod will automatically infer the static TypeScript type.

### Zod enums: declare a schema with a fixed set of allowable string values

> To create an enum the members of the enum need to be known at compile time.

```ts
const FishEnum = z.enum(['Salmon', 'Tuna', 'Trout']);
type FishEnum = z.infer<typeof FishEnum>;
// 'Salmon' | 'Tuna' | 'Trout'
```
