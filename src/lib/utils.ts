import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export async function timer(n: number) {
  console.log(`Waiting ${n} miliseconds...`);
  await new Promise((resolve) => setTimeout(resolve, n));
  console.log(`${n} miliseconds have passed.`);
}

export function getMonthAbbreviation(month: number) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months[month];
}
