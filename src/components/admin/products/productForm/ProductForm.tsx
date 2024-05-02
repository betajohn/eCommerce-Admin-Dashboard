'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { productFormSchema, ProductFormSchemaType } from '@/lib/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

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

import Carousel2 from '@/components/admin/products/productForm/FormPCarousel2';

export default function ProductForm({
  product,
  categories,
  isCopy,
  isEdit,
  isNew,
}: {
  product?: ProductFormSchemaType;
  categories: ShortedCategoriesType;
  isCopy?: boolean;
  isEdit?: boolean;
  isNew?: boolean;
}) {
  const form = useForm<ProductFormSchemaType>({
    resolver: zodResolver(productFormSchema),
    mode: 'onTouched',
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product?.price ?? -1,
      active: product?.active ?? true,
      category: {
        name: product?.category.name ?? '',
        categ_id: product?.category.categ_id ?? '',
      },
      images: product?.images ?? [],
    },
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  function onSubmit(values: ProductFormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        {isCopy && product && (
          <>
            <CardTitle className="text-xl sm:text-2xl">
              Create a New Product
            </CardTitle>
            <CardDescription>Based on {product.name}</CardDescription>
          </>
        )}
        {isNew && !product && (
          <>
            <CardTitle className="text-xl sm:text-2xl">
              Create a new Product
            </CardTitle>
            <CardDescription>All fields required</CardDescription>
          </>
        )}
        {isEdit && product && (
          <>
            <CardTitle className="text-xl sm:text-2xl">
              Editing Product _id: {JSON.stringify(product._id)}
            </CardTitle>
            <CardDescription>{product.name}</CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent className="w-full px-0 py-2">
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full gap-8 px-2 "
          >
            <div className="w-full h-full flex flex-col gap-8 items-center lg:flex-row">
              <div className="w-full max-w-[550px]">
                <Carousel2 form={form} />
              </div>
              <div className="flex flex-col w-full gap-3">
                <FormPName form={form} />
                <FormPDescription form={form} />
                <FormPPrice form={form} />
                <div className="flex items-end justify-between gap-4">
                  <FormPPCategories form={form} categories={categories} />
                  <FormPStatus form={form} />
                </div>
              </div>
            </div>

            <Button
              className="w-full"
              type="submit"
              disabled={!isDirty || !isValid || isSubmitting}
            >
              {product ? 'Submit Changes' : 'Create Product'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
