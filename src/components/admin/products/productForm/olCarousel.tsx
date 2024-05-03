'use client';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormSchemaType } from '@/lib/zodSchemas';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import AddImageSVG from '@/../public/images/addImage.svg';
import {
  Plus,
  Trash2Icon,
  CornerUpLeft,
  CornerUpRight,
  ImageUp,
  X,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CarouselOld({
  form,
}: {
  form: UseFormReturn<ProductFormSchemaType>;
}) {
  //const { ref, onBlur, onChange } = form.register('images');
  const [slides, setSlides] = useState(form.getValues('images'));
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

  function addImage() {
    const newImages = [
      ...slides,
      'https://fakestoreapi.com/img/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jpg',
    ];

    form.setValue('images', newImages, {
      shouldDirty: true,
      shouldTouch: true,
    });
    setSlides(newImages);
  }

  function moveLeft(able: boolean, i: number) {
    if (!able) return;
    const newImages = [...slides];
    newImages[i - 1] = slides[i];
    newImages[i] = slides[i - 1];
    form.setValue('images', newImages, {
      shouldDirty: true,
      shouldTouch: true,
    });
    setSlides(newImages);
  }
  function moveRight(able: boolean, i: number) {
    console.log('event activated');
    if (!able) return;
    const newImages = [...slides];
    newImages[i + 1] = slides[i];
    newImages[i] = slides[i + 1];
    form.setValue('images', newImages, {
      shouldDirty: true,
      shouldTouch: true,
    });
    emblaMainApi?.reInit();
    setSlides(newImages);
  }
  function X() {
    console.log(form.getValues('images'));
  }
  function trash() {
    console.log('trash');
  }
  function uploadHere() {}

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label>Product Images</Label>
        <Button
          type="button"
          onClick={() => {
            console.log('..............slides,.,,,,..');
            console.log(slides);

            console.log('..............from.getValues,.,,,,..');
            console.log(form.getValues('images'));
          }}
        >
          Print
        </Button>
        <div
          className="embla overflow-hidden w-full rounded-lg aspect-video border-foreground border bg-white"
          ref={emblaMainRef}
        >
          <div className="embla_container flex max-h-full">
            {[...slides, 'add'].map((x, i) => {
              return (
                <div
                  key={x}
                  className="flex-[0_0_100%] min-w-0 p-2 flex justify-center"
                >
                  <div className="grow">
                    <div className="max-h-full max-w-full aspect-square relative m-auto grow">
                      {x === 'add' ? (
                        <AddImageSVG onClick={addImage} />
                      ) : (
                        <Image src={x} key={x} alt="Product image" fill />
                      )}
                    </div>
                  </div>
                  {x !== 'add' && (
                    <div className="flex flex-col items-center m-auto text-gray-900 border border-border p-1 rounded-lg gap-1 h-fit absolute">
                      <CornerUpLeft
                        className={cn('w-7 h-7', i === 0 && 'text-gray-300')}
                        onClick={() => {
                          moveLeft(i !== 0, i);
                        }}
                      />
                      <Separator orientation="horizontal" />
                      <CornerUpRight
                        className={cn(
                          'w-7 h-7',
                          i === slides.length - 1 && 'text-gray-300'
                        )}
                        onClick={() => {
                          moveRight(i !== slides.length - 1, i);
                        }}
                      />
                      <Separator orientation="horizontal" className="" />
                      <ImageUp className="w-7 h-7" onClick={uploadHere} />
                      <Separator orientation="horizontal" />
                      <Trash2Icon className="w-7 h-7" onClick={trash} />
                    </div>
                  )}
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
          {[...slides, 'add'].map((x, index) => (
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
