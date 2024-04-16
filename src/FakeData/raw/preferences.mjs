export const themes = ['Dark', 'Light', 'System'];

export const payment_methods = [
  'Paypal',
  'Payoneer',
  'Credit Card',
  'GiftCard',
  'Stripe',
  'Webpay',
  'MercadoPago',
  'Shopify',
];

export const languages = ['en', 'es', 'jp'];
export const getRandomLanguage = () => {
  const random = Math.random();

  if (random > 0.9) return 'jp';
  if (random > 0.7) return 'es';
  return 'en';
};
