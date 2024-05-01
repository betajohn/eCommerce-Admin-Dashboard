# Embla Carousel notes and tricks

Embla Carousel is a library agnostic, dependency free and **lightweight** carousel library.Embla Carousel works in all modern browsers.

> library agnostic

You can use it in whatever stack you are working with, as long as it's react based.

> Dependency free?

Pure js/ts code. No need to install external libraries for it to work.

## 1. useEmblaCarousel()

```ts
import useEmblaCarousel from 'embla-carousel-react';

const [emblaRef, emblaApi] = useEmblaCarousel();

console.log(emblaApi);

{
  canScrollNext: canScrollNext();
  canScrollPrev: canScrollPrev();
  containerNode: containerNode();
  destroy: destroy();
  emit: emit(evt);
  internalEngine: internalEngine();
  off: off(evt, cb);
  on: on(evt, cb);
  plugins: plugins();
  previousScrollSnap: previousScrollSnap();
  reInit: reActivate(withOptions, withPlugins);
  rootNode: rootNode();
  scrollNext: scrollNext(jump);
  scrollPrev: scrollPrev(jump);
  scrollProgress: scrollProgress();
  scrollSnapList: scrollSnapList();
  scrollTo: scrollTo(index, jump, direction);
  selectedScrollSnap: selectedScrollSnap();
  slideNodes: slideNodes();
  slidesInView: slidesInView();
  slidesNotInView: slidesNotInView();
}
```

## 2. Reference emblaRef to your container

> [!IMPORTANT] Important
> You MUST follow the component's basic structure!

```tsx
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        <div className="embla__slide flex-[0_0_100%] min-w-0">Slide 1</div>
        <div className="embla__slide flex-[0_0_100%] min-w-0">Slide 2</div>
        <div className="embla__slide flex-[0_0_100%] min-w-0">Slide 3</div>
      </div>
    </div>
  );
}
```

## 3. ThumbsButtons
