'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { UseFormReturn } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';
import { ProductFormSchemaType } from '@/lib/zodSchemas';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import PCarouselButtons from '@/components/admin/products/productForm/PCarouselButtons';

export default function Carousel2({
  form,
}: {
  form: UseFormReturn<ProductFormSchemaType>;
}) {
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    loop: false,
    watchSlides: true,
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    watchSlides: true,
  });
  const [slides, setSlides] = useState(['MAR', 'SOL', 'TIERRA', 'LUNA']);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    <div className="flex flex-col gap-3">
      <div>
        <Label>Product Images</Label>
        <div className="flex justify-center border-foreground border rounded-lg bg-white gap-2">
          <PCarouselButtons
            emblaMainApi={emblaMainApi}
            selectedIndex={selectedIndex}
            slides={slides}
            setSlides={setSlides}
            setSelectedIndex={setSelectedIndex}
            onThumbClick={onThumbClick}
          />
          <div
            className="embla overflow-hidden w-full aspect-video rounded-lg"
            ref={emblaMainRef}
          >
            <div className="embla_container flex max-h-full">
              {slides.map((x) => {
                return (
                  <div
                    key={x}
                    className="embla__slide flex-[0_0_100%] min-w-0 text-black"
                  >
                    {x}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className="embla-thumbs__viewport overflow-hidden"
        ref={emblaThumbsRef}
      >
        <div className="embla-thumbs__container flex">
          {slides.map((x, index) => (
            <div
              key={index}
              className={cn(
                'embla-thumbs__slide rounded-lg border bg-card text-card-foreground shadow-sm flex-[0_0_22%] min-w-0 ml-3 sm:flex-[0_0_15%] border-foreground',
                index === selectedIndex && 'border-primary text-primary'
              )}
            >
              <button
                onClick={() => {
                  onThumbClick(index);
                }}
                type="button"
                className="w-full h-full"
              >
                {x === 'add' ? <Plus className="m-auto h-4" /> : index + 1}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
