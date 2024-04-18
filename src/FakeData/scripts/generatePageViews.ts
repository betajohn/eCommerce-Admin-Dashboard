import {
  generateGeoData,
  generateRandomIP,
} from '@/FakeData/raw/clientData.mjs';
import {
  getRandomMomentTodayUTC,
  getRandomMoment,
  getRandomElement,
} from '@/FakeData/utils.mjs';

const paths = ['/', '/sell-your-codes', '/offers', '/products'];

function getNOfPagesVisited() {
  const random = Math.random();
  if (random > 0.98) return 7;
  if (random > 0.95) return 6;
  if (random > 0.9) return 5;
  if (random > 0.84) return 4;
  if (random > 0.74) return 3;
  if (random > 0.49) return 2;
  return 1;
}

export function generateRandomPageViews(isNew = true) {
  const pageViews = [];
  const pagesVisited = getNOfPagesVisited();
  const ip = generateRandomIP();
  const geoData = generateGeoData();

  for (let i = 0; i < pagesVisited; i++) {
    pageViews.push({
      timestamp: isNew ? getRandomMomentTodayUTC() : getRandomMoment(),
      ip: ip,
      geo: geoData,
      path: getRandomElement(paths),
    });
  }

  return pageViews;
}
