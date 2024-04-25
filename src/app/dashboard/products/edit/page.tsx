import { seedProducts } from '@/FakeData/seed';
import { getProductByID } from '@/database/dbQueries/productsQueries';

import IDNotFound from '@/components/admin/edit/IDNotFound';
import { isValidIdString } from '@/lib/utils';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    _id?: string;
  };
}) {
  const query = searchParams?._id || '';
  const isValid = isValidIdString(query);
  let product;
  if (isValid) {
    product = await getProductByID(query);
  }

  return (
    <main className="h-full rounded-lg bg-card flex flex-col items-center justify-center p-2">
      {isValid && product ? (
        <div>Editing: {JSON.stringify(product)}</div>
      ) : (
        <IDNotFound isValid={isValid} product={null} />
      )}
    </main>
  );
}
