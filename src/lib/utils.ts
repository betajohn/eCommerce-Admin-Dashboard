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

export function toTitleCase(word: string) {
  let x = word.charAt(0).toUpperCase();
  for (let i = 1; i < word.length; i++) {
    x = x + word.charAt(i);
  }
  return x;
}

export function isValidIdString(s: string | undefined) {
  // Regular expression pattern to match hexadecimal string
  var pattern = /^[0-9a-fA-F]{24}$/;

  return pattern.test(s ?? '');
}
