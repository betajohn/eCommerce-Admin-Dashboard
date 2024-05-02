'use client';
import { Button } from '@/components/ui/button';
import { SelectItemIndicator } from '@radix-ui/react-select';
import useEmblaCarousel from 'embla-carousel-react';
import { useState } from 'react';

export default function Page() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    watchSlides: true,
  });
  const [slides, setSlides] = useState(['q']);
  const [selected, setSelected] = useState(0);

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
          let i = emblaApi?.selectedScrollSnap();
          if (i === 0) {
            console.log("can't move left");
            return;
          }
          console.log(emblaApi?.selectedScrollSnap());
          const newImages = [...slides];
          newImages[i - 1] = slides[i];
          newImages[i] = slides[i - 1];
          setSlides(newImages);
          emblaApi?.scrollTo(i - 1);
          setSelected(i - 1);
          console.log('moved left');
        }}
      >
        move left
      </Button>

      <Button
        onClick={() => {
          let i = emblaApi?.selectedScrollSnap();
          if (i === slides.length - 1) {
            console.log("can't move right");
            return;
          }
          console.log(emblaApi?.selectedScrollSnap());
          const newImages = [...slides];
          newImages[i + 1] = slides[i];
          newImages[i] = slides[i + 1];
          setSlides(newImages);
          emblaApi?.scrollTo(i + 1);
          setSelected(i + 1);
          console.log('moved right');
        }}
      >
        move right
      </Button>

      <Button
        onClick={() => {
          console.log(slides);
        }}
      >
        print
      </Button>
      {`${emblaApi?.selectedScrollSnap() + 1}/${slides.length}`}
    </div>
  );
}
