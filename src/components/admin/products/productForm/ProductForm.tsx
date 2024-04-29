'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { productFormSchema } from '@/lib/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductType } from '@/database/models/Products';
import {
  ShortedCategoriesType,
  StoreConfigType,
} from '@/database/models/StoreConfig';
//
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import FormPName from '@/components/admin/products/productForm/FormPName';
import FormPDescription from '@/components/admin/products/productForm/FormPDescription';
import FormPPrice from '@/components/admin/products/productForm/FormPPrice';
import FormPPCategories from '@/components/admin/products/productForm/FormPCategories';
import FormPStatus from '@/components/admin/products/productForm/FormPStatus';
import FormPCarousel from '@/components/admin/products/productForm/FromPCarousel';

export default function ProductForm({
  product,
  categories,
}: {
  product?: ProductType;
  categories: ShortedCategoriesType;
}) {
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product?.price ?? -1,
      status: product?.status ?? true,
      category: product?.category.name ?? '',
      images: product?.images ?? [],
    },
  });

  function onSubmit(values: z.infer<typeof productFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        {product ? (
          <>
            <CardTitle className="text-xl sm:text-2xl">
              Editing Product _id: {JSON.stringify(product._id)}
            </CardTitle>
            <CardDescription>{product.name}</CardDescription>
          </>
        ) : (
          <>
            <CardTitle className="text-xl sm:text-2xl">
              Creating a new Product
            </CardTitle>
            <CardDescription>All fields must be completed</CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent className="w-full px-0">
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full gap-8 px-2 "
          >
            <div className="w-full h-full flex flex-col gap-8 items-center lg:flex-row">
              <div className="w-full max-w-[550px] px-14">
                <FormPCarousel images={product?.images ?? []} form={form} />
              </div>
              <div className="flex flex-col w-full gap-3">
                <FormPName product={product} form={form} />
                <FormPDescription product={product} form={form} />
                <FormPPrice product={product} form={form} />
                <div className="flex items-end justify-between gap-4">
                  <FormPPCategories
                    product={product}
                    form={form}
                    categories={categories}
                  />
                  <FormPStatus product={product} form={form} />
                </div>
              </div>
            </div>

            <Button className="w-full" type="submit">
              {product ? 'Submit Changes' : 'Create Product'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
