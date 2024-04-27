'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { productFormSchema } from '@/lib/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductType } from '@/database/models/Products';
import { StoreConfigType } from '@/database/models/StoreConfig';

export default function ProductForm({
  product,
  categories,
}: {
  product?: ProductType;
  categories?: StoreConfigType['categories'];
}) {
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
      status: product?.status ?? 'active',
      category: product?.category.name ?? '',
      images: product?.images ?? [''],
    },
  });

  return <div>penisform</div>;
}
