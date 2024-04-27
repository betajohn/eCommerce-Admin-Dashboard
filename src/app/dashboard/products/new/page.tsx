import ProductForm from '@/components/admin/products/productForm/ProductForm';

export default async function Page() {
  return (
    <main className="h-full rounded-lg flex flex-col items-center justify-center">
      <ProductForm />
    </main>
  );
}
