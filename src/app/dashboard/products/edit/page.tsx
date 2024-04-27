import {
  getCategories,
  getProductByID,
} from '@/database/dbQueries/productsQueries';
import IDNotFound from '@/components/admin/edit/IDNotFound';
import { isValidIdString } from '@/lib/utils';
import ProductDisplay from '@/components/admin/edit/ProductDisplay';

const z = {
  rating: { rate: 2.1, count: 430 },
  _id: '661f881121251ab30391394c',
  name: 'Mens Casual Slim Fit',
  price: 15.99,
  description:
    'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
  category: { name: "men's clothing", categ_id: '662ca0ac9567b6923fa27d4f' },
  images: ['https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg'],
  status: 'active',
  __v: 0,
};

const q = [
  {
    _id: '662ca0ac9567b6923fa27d4f',
    name: "men's clothing",
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    _id: '662ca0ac9567b6923fa27d50',
    name: 'jewelry',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    _id: '662ca0ac9567b6923fa27d51',
    name: 'electronics',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    _id: '662ca0ac9567b6923fa27d52',
    name: "women's clothing",
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];

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
  const categories = q; //await getCategories();

  return (
    <main className="h-full rounded-lg flex flex-col items-center justify-center">
      {isValid && product ? (
        <ProductDisplay product={product} categories={categories} />
      ) : (
        <IDNotFound isValid={isValid} />
      )}
    </main>
  );
}
