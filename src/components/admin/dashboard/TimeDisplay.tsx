import { Card } from '@/components/ui/card';
import { getMonthAbbreviation } from '@/lib/utils';

function formatNumber(n: number) {
  if (n < 10) {
    return '0' + n;
  } else {
    return n;
  }
}

function formatDate(d: Date) {
  return `${now.getFullYear()}-${getMonthAbbreviation(
    now.getMonth()
  )}-${now.getDate()}  ${formatNumber(now.getHours())}:${formatNumber(
    now.getMinutes()
  )}`;
}

function formatUTCDate(d: Date) {
  return `${now.getUTCFullYear()}-${getMonthAbbreviation(
    now.getUTCMonth()
  )}-${now.getUTCDate()}  ${formatNumber(now.getUTCHours())}:${formatNumber(
    now.getUTCMinutes()
  )} UTC`;
}

const now = new Date();

export default function TimeDisplay() {
  return (
    <Card className="flex gap-2 justify-between items-center py-2 px-2 text-xs md:text-sm">
      <div className="inline-flex gap-1">
        <span className="hidden sm:inline-block">{'Local Time:'}</span>
        <span className="sm:hidden">{'L:'}</span>
        {formatDate(now)}
      </div>

      <div className="inline-flex gap-1">
        <span className="hidden sm:inline-block">{'Server Time:'}</span>
        <span className="sm:hidden">{'S:'}</span>
        {formatUTCDate(now)}
      </div>
    </Card>
  );
}
