import { Trash2Icon, CornerUpLeft, CornerUpRight, ImageUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { EmblaCarouselType } from 'embla-carousel';

export default function PCarouselButtons({
  selectedIndex,
  emblaMainApi,
  slides,
  setSlides,
  setSelectedIndex,
  onThumbClick,
}: {
  selectedIndex: number;
  emblaMainApi: EmblaCarouselType | undefined;
  slides: string[];
  setSlides: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  onThumbClick: (index: number) => void;
}) {
  function moveLeft() {
    if (!emblaMainApi || slides.length === 0) return;
    let i = emblaMainApi.selectedScrollSnap();
    if (i === 0) {
      console.log("can't move left");
      return;
    }
    const newImages = [...slides];
    newImages[i - 1] = slides[i];
    newImages[i] = slides[i - 1];
    setSlides(newImages);
    emblaMainApi.scrollTo(i - 1);
    onThumbClick(i - 1);
    setSelectedIndex(i - 1);
    console.log('moved left');
  }

  function moveRight() {
    if (!emblaMainApi || slides.length === 0) return;
    let i = emblaMainApi.selectedScrollSnap();
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
    setSelectedIndex(i + 1);
    console.log('moved right');
  }

  function deleteCurrentPic() {
    if (slides.length === 0) return;
    if (!emblaMainApi) return;
    let i = emblaMainApi.selectedScrollSnap();
    const newImages: string[] = [];
    for (let x = 0; x < slides.length; x++) {
      if (x !== i) {
        newImages.push(slides[x]);
      }
    }
    setSlides(newImages);
    console.log('deleted ' + i);
  }

  function uploadPicture(desiredIndex?: number) {
    setSlides([...slides, '' + Math.random()]);
  }

  return (
    <div className="flex flex-col items-center m-auto text-gray-900 border border-border p-1 rounded-lg gap-1 h-fit ">
      <CornerUpLeft
        className={cn('w-7 h-7', selectedIndex === 0 && 'text-gray-300')}
        onClick={moveLeft}
      />
      <Separator orientation="horizontal" />
      <CornerUpRight
        className={cn(
          'w-7 h-7',
          selectedIndex === slides.length - 1 && 'text-gray-300',
          slides.length === 0 && 'text-gray-300'
        )}
        onClick={moveRight}
      />
      <Separator orientation="horizontal" className="" />
      <ImageUp
        className="w-7 h-7"
        onClick={() => {
          uploadPicture(selectedIndex);
        }}
      />
      <Separator orientation="horizontal" />
      <Trash2Icon
        className={cn('w-7 h-7', slides.length === 0 && 'text-gray-300')}
        onClick={deleteCurrentPic}
      />
    </div>
  );
}
