# Nextjs tips and tricks

## usePathname

usePathname is a Client Component hook that lets you read the current URL's pathname.

usePathname returns a string of the current URL's pathname.

```ts
'use client';

import { usePathname } from 'next/navigation';
```