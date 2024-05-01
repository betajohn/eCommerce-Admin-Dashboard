'use client';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import { useState } from 'react';

export default function Page() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [images, setImages] = useState(['q', 'min', 'max']);

  //console.log(emblaApi?.);

  return (
    <div>
      <div
        className="embla overflow-hidden max-w-sm aspect-video bg-white"
        ref={emblaRef}
      >
        <div className="embla__container flex">
          {images.map((x) => {
            return (
              <div
                key={x}
                className="embla__slide flex-[0_0_100%] min-w-0 bg-gray-700 h-10"
              >
                {x}
              </div>
            );
          })}
        </div>
      </div>
      <Button
        onClick={() => {
          setImages([...images, 'penis']);
        }}
      >
        add
      </Button>
    </div>
  );
}
