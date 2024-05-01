import { UseFormReturn } from 'react-hook-form';
import { ProductFormSchemaType } from '@/lib/zodSchemas';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Label } from '@/components/ui/label';

export default function FormPCarousel({
  form,
}: {
  form: UseFormReturn<ProductFormSchemaType>;
}) {
  const { ref, onBlur, onChange } = form.register('images');
  const watchedImg = form.watch('images');

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  return (
    <div>
      <Label>Product Images</Label>
      <div
        className="embla_container overflow-hidden w-full rounded-lg aspect-video bg-white"
        ref={emblaRef}
      >
        <div className="flex">
          {watchedImg.map((x, i) => {
            console.log('painting img ' + i);
            return (
              <div key={x} className="flex-[0_0_100%] min-w-0">
                <div className="h-full aspect-square relative">
                  <Image src={x} key={x} alt="Product image" fill />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        type="button"
        onClick={() => {
          const newImages = [
            ...watchedImg,
            'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
          ];

          form.setValue('images', newImages, {
            shouldDirty: true,
            shouldTouch: true,
          });
        }}
      >
        Add Image
      </Button>
    </div>
  );
}
