'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '../ModeToggle';
import { usePathname } from 'next/navigation';
import NavLinks from '@/components/admin/NavLinks';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { toTitleCase } from '@/lib/utils';
import Link from 'next/link';

function createPathString(arr: string[], index: number) {
  let path = '/';
  for (let i = 1; i < index + 1; i++) {
    path = path + arr[i] + '/';
  }

  return path;
}
function shortenSegment(s: string) {
  if (s === 'dashboard') return 'DB';
}

function BreadcrumbContainer() {
  const pathname = usePathname();
  const segments = pathname.split('/'); //returns ['', 'dashboard','products']

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((s) => {
          if (segments.indexOf(s) === 1) {
            if (segments.length === 2) {
              return (
                <BreadcrumbItem key={segments.indexOf(s)}>
                  <BreadcrumbPage>{toTitleCase(s)}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            } else {
              return (
                <div
                  className="inline-flex items-center gap-1.5"
                  key={segments.indexOf(s)}
                >
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      <Link href={`/${s}`}>{toTitleCase(s)}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem className="md:hidden">
                    <BreadcrumbLink asChild>
                      <Link href={`/${s}`}>{shortenSegment(s)}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator />
                </div>
              );
            }
          }
          if (segments.indexOf(s) > 1) {
            if (segments.indexOf(s) + 1 === segments.length) {
              return (
                <BreadcrumbItem key={segments.indexOf(s)}>
                  <BreadcrumbPage>{toTitleCase(s)}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            } else {
              return (
                <div
                  className="inline-flex items-center gap-1.5"
                  key={segments.indexOf(s)}
                >
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href={createPathString(segments, segments.indexOf(s))}
                      >
                        {toTitleCase(s)}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </div>
              );
            }
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function DBHeader() {
  return (
    <div className="w-full flex items-center justify-between rounded-lg border bg-card text-card-foreground shadow-sm p-2">
      <div className="flex justify-center items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="w-8 sm:hidden p-0" />
          </SheetTrigger>
          <SheetContent side="left" className="w-auto">
            <NavLinks hamburgerView={true} />
          </SheetContent>
        </Sheet>
        <BreadcrumbContainer />
      </div>
      <div className="flex justify-center items-center gap-2 px-2">
        <ModeToggle />
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
