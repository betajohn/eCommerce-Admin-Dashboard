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
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function DBHead({ show, setShow }: AsideProps) {
  function x() {
    setShow(true);
  }
  function y() {
    setShow(false);
  }
  return (
    <Card className="w-full flex items-center justify-between h-auto rounded-lg border bg-card text-card-foreground shadow-sm p-2">
      <div className="flex justify-center items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button onClick={x} variant="ghost" className="sm:hidden p-0">
              <Menu className="w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            onCloseAutoFocus={y}
            className="w-auto bg-red-800"
          >
            {asideContent(true)}
          </SheetContent>
        </Sheet>
        <CardHeader className="py-0">
          <CardTitle className="text-xl">Dashboard</CardTitle>
        </CardHeader>
      </div>
      <div className="flex justify-center items-center gap-2 px-2">
        <ModeToggle />
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </Card>
  );
}
