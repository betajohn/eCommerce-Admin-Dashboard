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
    <Card className="flex flex-col sm:flex-row gap-2 justify-between items-center py-2 px-3 text-xs md:text-sm">
      <span>{`Local Time: ${formatDate(now)}`}</span>
      <span>{`Server Time: ${formatUTCDate(now)}`}</span>
    </Card>
  );
}
