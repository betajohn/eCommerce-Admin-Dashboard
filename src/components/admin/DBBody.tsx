import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Logo from '/public/images/JohnsSVG.svg';

export default function DBBody() {
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:3fr_1fr;] items-center justify-center gap-2">
      {/*1st-3rd columns */}
      <div className="w-full h-full flex flex-col gap-2">
        {/*Top 3 cards */}
        <div className="w-full flex flex-col lg:flex-row gap-2">
          <Card className="w-full h-[180px]">
            <CardContent>top1</CardContent>
          </Card>
          <Card className="w-full h-[180px]">
            <CardContent>top2</CardContent>
          </Card>
          <Card className="w-full h-[180px]">
            <CardContent>top3</CardContent>
          </Card>
        </div>
        {/*Bottom 3 cards */}
        <Card className="w-full h-[330px]">
          <CardContent>big1</CardContent>
        </Card>
        <Card className="w-full h-[100px]">
          <CardContent>big2</CardContent>
        </Card>
      </div>
      {/*4th column */}
      <div className="w-full h-full flex flex-col gap-2">
        <Card className="w-full h-[200px]">
          <CardContent>d1</CardContent>
        </Card>
        <Card className="w-full h-[200px]">
          <CardContent>d2</CardContent>
        </Card>
        <Card className="w-full h-[200px]">
          <CardContent>d3</CardContent>
        </Card>
      </div>
    </div>
  );
}
