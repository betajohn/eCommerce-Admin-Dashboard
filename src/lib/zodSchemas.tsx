import { z } from 'zod';

export const productFormSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .trim()
    .max(200, { message: 'Name must be max 200 characters long' }),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Name must be a string',
    })
    .trim()
    .max(1000, { message: 'Description must be max 1000 characters long' }),
  price: z.coerce
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .nonnegative({ message: 'Price can not be negative' })
    .lte(999999999, { message: 'Number too Big' }),
  category: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .trim(),
  images: z.string().array(),
  status: z.boolean(),
});
