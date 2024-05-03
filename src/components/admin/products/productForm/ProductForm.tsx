'use client';

import { FieldErrors, useForm } from 'react-hook-form';
import { productFormSchema, ProductFormSchemaType } from '@/lib/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { ShortedCategoriesType } from '@/database/models/StoreConfig';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import FormPName from '@/components/admin/products/productForm/FormPName';
import FormPDescription from '@/components/admin/products/productForm/FormPDescription';
import FormPPrice from '@/components/admin/products/productForm/FormPPrice';
import FormPPCategories from '@/components/admin/products/productForm/FormPCategories';
import FormPStatus from '@/components/admin/products/productForm/FormPStatus';

import FormPTitle from '@/components/admin/products/productForm/FormPTitle';
import FromPSwiper from '@/components/admin/products/productForm/FormPSwiper';

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

  function onError(errors: FieldErrors) {
    console.log(errors);
  }

  return (
    <Card className="w-full">
      <FormPTitle
        product={product}
        isNew={isNew}
        isCopy={isCopy}
        isEdit={isEdit}
      />
      <CardContent className="w-full px-0 py-2">
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="flex flex-col items-center w-full gap-8 px-2"
          >
            <div className="w-full h-full flex flex-col gap-8 lg:flex-row justify-start">
              <div className="w-full lg:w-[50%]">
                <FromPSwiper form={form} />
              </div>
              <div className="flex flex-col w-full lg:w-[50%] gap-3">
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
