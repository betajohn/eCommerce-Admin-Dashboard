# Nextjs tips and tricks

## usePathname

usePathname is a Client Component hook that lets you read the current URL's pathname.

usePathname returns a string of the current URL's pathname.

```ts
'use client';

import { usePathname } from 'next/navigation';

const path = usePathname();
//path = '/dashboard/products/new)'
const segments = path.split('/');
// segments = ['/', 'dashboard', 'products', 'new']
```

## searchParams

To access search params in Pages (Server Components), use the searchParams prop.

> Unlike Pages, Layouts (Server Components) do not receive the searchParams prop.

```ts
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    _id?: string;
  };
}) {
  const query = searchParams?._id || '';

  return <div className="w-full">{query}</div>;
}
```
