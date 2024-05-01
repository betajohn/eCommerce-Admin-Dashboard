import { UseFormReturn } from 'react-hook-form';
import { ProductFormSchemaType } from '@/lib/zodSchemas';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { useState, useEffect, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import Thumb from '@/components/admin/products/productForm/Thumb';

export default function FormPCarousel({
  form,
}: {
  form: UseFormReturn<ProductFormSchemaType>;
}) {
  //const { ref, onBlur, onChange } = form.register('images');
  const watchedImg = form.watch('images');
  const slides = watchedImg;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Label>Product Images</Label>
        <div
          className="embla overflow-hidden w-full rounded-lg aspect-video bg-white"
          ref={emblaMainRef}
        >
          <div className="embla_container flex">
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
      </div>

      <div
        className="embla-thumbs__viewport overflow-hidden"
        ref={emblaThumbsRef}
      >
        <div className="embla-thumbs__container flex">
          {slides.map((x, index) => (
            <Thumb
              key={index}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              index={index}
            />
          ))}
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

/*

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

      */
