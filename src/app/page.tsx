import generateSubmission, {
  xRandom,
} from '@/FakeData/scripts/generateSubmissions';
import {
  seedAllToday,
  registerUserNow,
  seedPageViewsToday,
} from '@/FakeData/seed';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  //registerUserNow();
  //seedAllToday(10);
  //seedPageViewsToday();
  //generateSubmission();
  //xRandom();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      go to <Link href={'/dashboard'}>/dashboard</Link>
      <ul>
        <li>Uno</li>
        <li>Dos</li>
        <li>Tres</li>
      </ul>
    </main>
  );
}
