import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { StoreConfigType } from '@/database/models/StoreConfig';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ProductType } from '@/database/models/Products';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

const productForm = z.object({
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
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .nonnegative({ message: 'Price can not be negative' })
    .lte(999999999, { message: 'Number too Big' }),
  category: z.custom(),
});

export default function ProductDisplay({
  product,
  categories,
}: {
  product: ProductType;
  categories: StoreConfigType['categories'];
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          Editing Product _id: {JSON.stringify(product._id)}
        </CardTitle>
        <CardDescription>{product.name}</CardDescription>
      </CardHeader>
      <CardContent className="w-full px-0">
        <form className="flex flex-col items-center w-full gap-8 px-2 ">
          <div className="w-full h-full flex flex-col gap-8 items-center lg:flex-row">
            <div className="w-full max-w-[550px] px-14 bg-primary">
              <Carousel className="w-full aspect-square max-w-xs mx-auto">
                <CarouselContent>
                  {product.images.map((img) => {
                    return (
                      <CarouselItem key={img}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <Image
                                src={img}
                                alt={product.name + "'s image"}
                                fill
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="flex flex-col w-full gap-3">
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Product name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={product.name}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  defaultValue={product.description}
                  name="description"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="price">Price USD</Label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  defaultValue={product.price}
                />
              </div>
              <div className="flex items-end justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={product.category.name} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => {
                        return (
                          <SelectItem value={cat.name} key={cat.name}>
                            {cat.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 items-center mb-2 pr-4 text-xs">
                  <Label htmlFor="status">Inactive</Label>
                  <Switch />
                  <Label htmlFor="status">Active</Label>
                </div>
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
