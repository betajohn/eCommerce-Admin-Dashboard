import { getRandomElement } from '../utils.mjs';
import countries from '../raw/address/countries.json' assert { type: 'json' };

const regions = ['NA', 'SA', 'CA', 'EU', 'Asia'];

export function generateGeoData() {
  const c = getRandomElement(countries);

  return {
    city: getRandomElement(c.biggest_cities),
    country: c.name,
    latitude: c.latitude,
    longitude: c.longitude,
    region: getRandomElement(regions),
  };
}
