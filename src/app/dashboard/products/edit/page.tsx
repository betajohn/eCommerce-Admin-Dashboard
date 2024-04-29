import {
  getCategories,
  getProductByID,
} from '@/database/dbQueries/productsQueries';
import IDNotFound from '@/components/admin/edit/IDNotFound';
import { isValidIdString } from '@/lib/utils';
import FormWrapper from '@/components/admin/products/productForm/FormWrapper';

const z = {
  rating: { rate: 2.1, count: 430 },
  _id: '661f881121251ab30391394c',
  name: 'Mens Casual Slim Fit',
  price: 15.99,
  description:
    'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
  category: { name: "men's clothing", categ_id: '662ca0ac9567b6923fa27d4f' },
  images: ['https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg'],
  status: true,
  __v: 0,
};

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
    product = z; // await getProductByID(query);
  }

  return (
    <main className="h-full rounded-lg flex flex-col items-center justify-center">
      {isValid && product ? (
        <FormWrapper product={product} />
      ) : (
        <IDNotFound isValid={isValid} query={query} />
      )}
    </main>
  );
}
