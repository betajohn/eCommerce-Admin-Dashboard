import { getCategories } from '@/database/dbQueries/productsQueries';
import ProductForm from '@/components/admin/products/productForm/ProductForm';

const categories = [
  {
    name: "men's clothing",
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    _id: '662ca0ac9567b6923fa27d4f',
  },
  {
    name: 'jewelry',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    _id: '662ca0ac9567b6923fa27d50',
  },
  {
    name: 'electronics',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    _id: '662ca0ac9567b6923fa27d51',
  },
  {
    name: "women's clothing",
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    _id: '662ca0ac9567b6923fa27d52',
  },
];

export default async function FormWrapper({ product }) {
  //const categories = await getCategories();

  return <ProductForm categories={categories} product={product} />;
}
