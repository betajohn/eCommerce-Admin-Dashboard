import { UseFormReturn } from 'react-hook-form';
import { ProductFormSchemaType } from '@/lib/zodSchemas';
import { Label } from '@/components/ui/label';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/thumbs';
import Image from 'next/image';
import FormPImgControl from '@/components/admin/products/productForm/FormPImgControl';
import { useState } from 'react';
import { Thumbs } from 'swiper/modules';
import { Badge } from '@/components/ui/badge';

//TODO: Delete when ready to upload images
const slidesz: string[] = [
  'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
  'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
  'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
  'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
];

export default function FormSwiper({
  form,
}: {
  form: UseFormReturn<ProductFormSchemaType>;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = form.watch('images');

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label>Product Images</Label>
        <div className="flex justify-center border-foreground border rounded-lg bg-white gap-2">
          <FormPImgControl
            form={form}
            slides={slides}
            currentIndex={currentIndex}
          />
          <Swiper
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Thumbs]}
            onRealIndexChange={(swiper) => setCurrentIndex(swiper.realIndex)}
            onSwiper={(swiper) => console.log(swiper)}
            className="overflow-hidden w-full aspect-video rounded-lg"
          >
            {slides.map((img, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className=" h-full w-full flex items-center justify-center relative">
                    {i === 0 && (
                      <Badge
                        className="absolute bottom-2 right-2 text-base z-10"
                        variant={'destructive'}
                      >
                        Main Image
                      </Badge>
                    )}
                    <div className="relative w-[70%] h-[80%] ">
                      <Image src={img} alt="prod img" fill />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <Swiper
          onSwiper={(swiper) => {
            setThumbsSwiper(swiper);
          }}
          spaceBetween={3}
          slidesPerView={4}
          modules={[Thumbs]}
          watchSlidesProgress={true}
          centerInsufficientSlides
          onSlideChange={() => console.log('slide change')}
          className="overflow-hidden w-full h-[60px] rounded-lg mt-2"
        >
          {slides.map((img, i) => {
            return (
              <SwiperSlide key={i} className="bg-white rounded-lg relative">
                {i === 0 && (
                  <Badge
                    className="absolute  right-1 bottom-1 text-base z-10"
                    variant={'destructive'}
                  ></Badge>
                )}
                <div className="relative aspect-video h-full mx-auto">
                  <Image src={img} alt="prod img" fill className="p-1" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
