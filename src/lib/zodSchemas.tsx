import { z } from 'zod';

export const productFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Required' })
    .max(200, { message: 'Name must be max 200 characters long' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Required' })
    .max(1000, { message: 'Description must be max 1000 characters long' }),
  price: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
      required_error: 'Required',
    })
    .nonnegative({ message: "Price can't be negative" })
    .lte(999999999, { message: 'Number too Big' }),
  category: z.string().min(1, { message: 'Required' }),
  images: z
    .string()
    .url({ message: 'Not a valid url' })
    .array()
    .min(1, { message: 'At least ONE picture is required' })
    .max(5, { message: 'Can have up to 4 pictures' }),
  status: z.boolean(),
});

export type ProductFormSchemaType = z.infer<typeof productFormSchema>;
