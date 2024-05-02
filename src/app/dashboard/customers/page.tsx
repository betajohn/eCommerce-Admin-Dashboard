'use client';

import CarouselOld from '@/components/admin/products/productForm/FormPCarousel';
import { useForm } from 'react-hook-form';
import { ProductFormSchemaType } from '@/lib/zodSchemas';
export default function Page() {
  const form = useForm<ProductFormSchemaType>({
    defaultValues: {
      name: '',
      description: '',
      price: -1,
      active: true,
      category: {
        name: '',
        categ_id: '',
      },
      images: [],
    },
  });

  return (
    <div className="w-[600px]">
      <CarouselOld form={form} />
    </div>
  );
}
