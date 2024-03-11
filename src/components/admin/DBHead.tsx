import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { asideContent } from './Aside';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '../ModeToggle';
import { Card, CardHeader, CardTitle } from '../ui/card';

interface AsideProps {
  setPanel: Dispatch<SetStateAction<string>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  panel: string;
}

export default function DBHead({ setPanel, panel, setShow, show }: AsideProps) {
  return (
    <div className="w-full flex items-center justify-between rounded-lg border bg-card text-card-foreground shadow-sm p-2">
      <div className="flex justify-center items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              onClick={() => setShow(true)}
              variant="ghost"
              className="sm:hidden p-0"
            >
              <Menu className="w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            onCloseAutoFocus={() => setShow(false)}
            className="w-auto"
          >
            {asideContent(true, setPanel)}
          </SheetContent>
        </Sheet>
        <CardHeader className="py-0">
          <CardTitle className="text-xl">{panel}</CardTitle>
        </CardHeader>
      </div>
      <div className="flex justify-center items-center gap-2 px-2">
        <ModeToggle />
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
