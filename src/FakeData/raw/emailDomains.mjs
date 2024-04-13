import { truncateToTwoDecimals } from '../utils.mjs';

export const emailShare = new Map([
  [0.44, '@gmail.com'],
  [0.89, '@apple.com'],
  [0.92, '@outlook.com'],
  [0.95, '@yahoo.com'],
  [0.96, '@protonmail.com'],
  [0.97, '@gmx.de'],
  [0.98, '@orange.fr'],
  [0.99, '@samsung.com'],
  [1.0, '@qq.com'],
]);

export function generateEmailDomain() {
  const random = truncateToTwoDecimals(Math.random() + 0.01);
  if (random === 1.0) return '@qq.com';
  if (random === 0.99) return '@samsung.com';
  if (random === 0.98) return '@orange.fr';
  if (random === 0.97) return '@gmx.de';
  if (random === 0.96) return '@protonmail.com';
  if (random > 0.92) return '@yahoo.com';
  if (random > 0.89) return '@outlook.com';
  if (random > 0.44) return '@apple.com';
  return '@gmail.com';
}
