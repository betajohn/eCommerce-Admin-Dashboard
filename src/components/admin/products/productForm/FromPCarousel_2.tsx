import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import AddImage from '@/../public/images/addImage.svg';

export default function FormPCarousel({ form, images }: { images: string[] }) {
  return (
    <FormField
      control={form.control}
      name="images"
      render={({ field }) => (
        <FormItem>
          <FormMessage />
          <div className="flex flex-col gap-1">
            <FormControl>
              <Carousel className="w-full aspect-square max-w-xs mx-auto">
                <CarouselContent>
                  {images.map((img) => {
                    return (
                      <CarouselItem key={img}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <Image src={img} alt={'product Image'} fill />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    );
                  })}
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <AddImage />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
}
