import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ProductFormSchemaType } from '@/lib/zodSchemas';

export default function FormPTitle({
  isCopy,
  isNew,
  isEdit,
  product,
}: {
  isCopy?: boolean;
  isNew?: boolean;
  isEdit?: boolean;
  product?: ProductFormSchemaType;
}) {
  return (
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
  );
}
