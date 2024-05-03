import { PackagePlusIcon } from 'lucide-react';
import Link from 'next/link';

export default function DBShortcuts() {
  return (
    <Link
      href={'/dashboard/products/new'}
      className="relative rounded-lg text-card-foreground shadow-sm w-full flex flex-col p-4 aspect-[16/6] bg-primary"
    >
      <span className="font-semibold text-3xl sm:text-[clamp(1.5rem,_3vw,_2rem)]">
        New Product
      </span>
      <h3 className="text-gray-200">Create a new listing</h3>
      <div className="absolute h-[60%] aspect-square object-cover bottom-0 right-1 overflow-hidden">
        <PackagePlusIcon className="w-[100%] h-[100%] text-gray-100" />
      </div>
    </Link>
  );
}
