'use client';
import { getCategFromProds } from '@/FakeData/scripts/generateStoreConfig';
import generateSubmission from '@/FakeData/scripts/generateSubmissions';
import {
  seedAllToday,
  registerUserNow,
  seedPageViewsToday,
  seedSubmissionsToday,
  seedStoreConfig,
  seedProducts,
} from '@/FakeData/seed';
import { roundToTwoDecimals } from '@/FakeData/utils';
import { Button } from '@/components/ui/button';
import { getCategories } from '@/database/dbQueries/productsQueries';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  //registerUserNow();
  //seedAllToday(10);
  //seedPageViewsToday();
  //generateSubmission();
  //xRandom();
  //seedSubmissionsToday();
  //seedStoreConfig();
  //getCategFromProds();
  //seedProducts();
  const viewportWidth = useRef(0);
  const viewPortHeight = useRef(0);
  const maxBlocksW = useRef(0);
  const maxBlocksH = useRef(0);
  const [arr, setArr] = useState<number[]>([]);
  const [arrH, setArrH] = useState<number[]>([]);

  useEffect(() => {
    viewportWidth.current = window.innerWidth;
    viewPortHeight.current = window.innerHeight;

    maxBlocksW.current = Math.floor(viewportWidth.current / 100);
    maxBlocksH.current = Math.floor(viewPortHeight.current / 100);

    const arr1: number[] = [];
    for (let i = 0; i < maxBlocksW.current; i++) {
      arr1.push(i);
    }
    if (arr1.length !== arr.length) {
      setArr(arr1);
    }

    const arr2: number[] = [];
    for (let i = 1; i < maxBlocksH.current; i++) {
      arr2.push(i);
    }
    if (arr2.length !== arrH.length) {
      setArrH(arr2);
    }
    console.log('effect');
  }, [arr, arrH]);

  function calculateDevicePixelRatio() {
    // Calculate the ratio of physical pixels to CSS pixels for width
    const widthRatio = window.innerWidth / screen.width;

    // Calculate the ratio of physical pixels to CSS pixels for height
    const heightRatio = window.innerHeight / screen.height;

    // Choose the maximum of width and height ratios
    const devicePixelRatio = Math.max(widthRatio, heightRatio);

    return devicePixelRatio;
  }

  return (
    <main className="flex min-h-screen flex-col items-start">
      <Link
        href={'/dashboard'}
        className="bg-gray-900 text-gray-100 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 border border-black text-xl px-8 py-2 text-center rounded-lg flex flex-col"
      >
        <div> Click to Go to /dashboard </div>
        <div>{`window.devicePixelRatio: ${window?.devicePixelRatio}`}</div>
        <div>{`window.innerWidth: ${window?.innerWidth}`}</div>
        <div>{`physical resolution (screen.width): ${screen?.width}`}</div>
        <div>{`myDpr: ${roundToTwoDecimals(
          screen?.width / window?.innerWidth
        )}`}</div>
        <img
          src="/fish_400w.webp"
          srcSet="https://i.imgur.com/9hWKw3K.jpeg 800w,
          https://i.imgur.com/P4CIRfE.jpeg 1200w,
          https://i.imgur.com/fGKWCJR.jpeg 400w
        "
          sizes="400px"
        />
      </Link>

      <div className="h-[100px] w-full bg-red-300 flex">
        {arr.map((item, index) => {
          return (
            <div
              className="min-w-[100px] h-full border border-black flex items-center justify-center text-xs"
              key={index}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      {arrH.map((item, index) => {
        return (
          <div
            className="min-h-[100px] min-w-[100px] border border-black flex items-center justify-center text-xs  bg-red-300"
            key={index}
          >
            {index + 1 + 1}
          </div>
        );
      })}
    </main>
  );
}
