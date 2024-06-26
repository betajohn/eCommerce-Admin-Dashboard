import { UseFormReturn } from 'react-hook-form';
import { ProductFormSchemaType } from '@/lib/zodSchemas';

export type ProductFormType = UseFormReturn<ProductFormSchemaType>;

export type ProductFormElementType = {
  form: UseFormReturn<ProductFormSchemaType>;
  product: ProductFormSchemaType;
};
