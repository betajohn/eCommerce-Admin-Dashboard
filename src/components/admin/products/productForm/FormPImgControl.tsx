import { Trash2Icon, CornerUpLeft, CornerUpRight, ImageUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { getRandomElement } from '@/FakeData/utils';
import { MutableRefObject } from 'react';
import { Button } from '@/components/ui/button';

const slideR: string[] = [
  'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
  'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
  'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
  'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
];

export default function FormPImgControl({
  currentIndex,
  slides,
  setSlides,
}: {
  slides: string[];
  setSlides: React.Dispatch<React.SetStateAction<string[]>>;
  currentIndex: number;
}) {
  function moveLeft() {
    if (slides.length === 0 || currentIndex === 0) {
      console.log("can't move left");
      return;
    }
    const newImages = [...slides];
    newImages[currentIndex - 1] = slides[currentIndex];
    newImages[currentIndex] = slides[currentIndex - 1];
    setSlides(newImages);
    console.log('moved left');
  }
  function moveRight() {
    if (slides.length === 0 || currentIndex === slides.length - 1) {
      console.log("can't move right");
      return;
    }
    const newImages = [...slides];
    newImages[currentIndex + 1] = slides[currentIndex];
    newImages[currentIndex] = slides[currentIndex + 1];
    setSlides(newImages);
    console.log('moved right');
  }
  function uploadPicture() {
    setSlides([...slides, '' + getRandomElement(slideR)]);
  }
  function deleteCurrentPic() {
    if (slides.length === 0) return;
    const newImages: string[] = [];
    for (let x = 0; x < slides.length; x++) {
      if (x !== currentIndex) {
        newImages.push(slides[x]);
      }
    }
    setSlides(newImages);
    console.log('deleted ' + currentIndex);
  }

  return (
    <div className="flex flex-col items-center m-auto text-gray-100  p-1 rounded-lg gap-1 h-fit ml-1 bg-primary">
      <Button
        variant={'ghost'}
        type="button"
        disabled={slides.length === 0 || currentIndex === 0}
        onClick={moveLeft}
        className={'p-1'}
      >
        <CornerUpLeft className="h-6 w-6" />
      </Button>

      <Separator orientation="horizontal" className="bg-gray-100" />

      <Button
        variant={'ghost'}
        type="button"
        disabled={slides.length === 0 || currentIndex === slides.length - 1}
        onClick={moveRight}
        className={'p-1'}
      >
        <CornerUpRight className="h-6 w-6" />
      </Button>

      <Separator orientation="horizontal" className="bg-gray-100" />

      <Button
        variant={'ghost'}
        type="button"
        onClick={uploadPicture}
        className={'p-1'}
      >
        <ImageUp className="h-6 w-6" />
      </Button>

      <Separator orientation="horizontal" className="bg-gray-100" />

      <Button
        variant={'ghost'}
        type="button"
        disabled={slides.length === 0}
        onClick={deleteCurrentPic}
        className={'p-1'}
      >
        <Trash2Icon className="h-6 w-6" />
      </Button>
    </div>
  );
}
