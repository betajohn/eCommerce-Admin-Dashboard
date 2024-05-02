'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormSchemaType } from '@/lib/zodSchemas';

export default function Carousel2({
  form,
}: {
  form: UseFormReturn<ProductFormSchemaType>;
}) {
  return <div>carousel</div>;
}
