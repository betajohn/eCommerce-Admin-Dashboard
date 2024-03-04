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

interface AsideProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function DBHead({ show, setShow }: AsideProps) {
  function x() {
    console.log('first');
    setShow(true);
  }
  function y() {
    setShow(false);
  }
  return (
    <div className="w-full flex items-center h-auto rounded-lg border bg-card text-card-foreground shadow-sm p-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button onClick={x} variant="ghost" className="sm:hidden">
            <Menu className="w-7" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" onCloseAutoFocus={y} className="w-auto">
          <SheetHeader>
            <SheetTitle>Admin</SheetTitle>
            <SheetDescription className="flex flex-col items-start h-full">
              {asideContent(true)}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      Admin Dashboard
    </div>
  );
}
