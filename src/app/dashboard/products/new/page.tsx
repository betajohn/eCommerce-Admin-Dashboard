import ProductForm from '@/components/admin/products/productForm/ProductForm';
import { getCategories } from '@/database/dbQueries/productsQueries';

export default async function Page() {
  const categories = await getCategories();

  return (
    <main className="h-full rounded-lg flex flex-col items-center justify-center">
      <ProductForm categories={categories} />
    </main>
  );
}
