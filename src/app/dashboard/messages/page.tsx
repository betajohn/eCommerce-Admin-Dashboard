'use client';
import { Button } from '@/components/ui/button';
import { SelectItemIndicator } from '@radix-ui/react-select';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Trash2Icon,
  CornerUpLeft,
  CornerUpRight,
  ImageUp,
  X,
} from 'lucide-react';

export default function Page() {
  const [emblaRef, emblaMainApi] = useEmblaCarousel({
    loop: false,
    watchSlides: true,
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    watchSlides: true,
  });
  const [slides, setSlides] = useState(['q']);
  const [selected, setSelected] = useState(0);
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
    <div>
      <div
        className="embla overflow-hidden max-w-sm aspect-video bg-white"
        ref={emblaRef}
      >
        <div className="embla__container flex">
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
      <Button
        onClick={() => {
          setSlides([...slides, '' + Math.random()]);
        }}
      >
        add
      </Button>

      <Button
        onClick={() => {
          let i = emblaMainApi?.selectedScrollSnap();
          if (i === 0) {
            console.log("can't move left");
            return;
          }
          console.log(emblaMainApi?.selectedScrollSnap());
          const newImages = [...slides];
          newImages[i - 1] = slides[i];
          newImages[i] = slides[i - 1];
          setSlides(newImages);
          emblaMainApi?.scrollTo(i - 1);
          onThumbClick(i - 1);
          setSelected(i - 1);
          console.log('moved left');
        }}
      >
        move left
      </Button>

      <Button
        onClick={() => {
          let i = emblaMainApi?.selectedScrollSnap();
          if (i === slides.length - 1) {
            console.log("can't move right");
            return;
          }

          const newImages = [...slides];
          newImages[i + 1] = slides[i];
          newImages[i] = slides[i + 1];
          setSlides(newImages);
          emblaMainApi?.scrollTo(i + 1);
          onThumbClick(i + 1);
          setSelected(i + 1);
          console.log('moved right');
        }}
      >
        move right
      </Button>
      <Button
        onClick={() => {
          let i = emblaMainApi?.selectedScrollSnap();
          const newImages: string[] = [];
          for (let x = 0; x < slides.length; x++) {
            if (x !== i) {
              newImages.push(slides[x]);
            }
          }

          setSlides(newImages);
          console.log('deleted ' + i);
        }}
      >
        delete
      </Button>

      <Button
        onClick={() => {
          console.log(slides);
        }}
      >
        print
      </Button>
      {`${emblaMainApi?.selectedScrollSnap() + 1}/${slides.length}`}

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
