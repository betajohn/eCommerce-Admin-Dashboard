import { getRandomElement } from '../utils.js';
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

export function generateRandomIP() {
  // IPv4 are 32-bit numerical values expressed in four octets separated by periods, such as 192.168.1.1.
  //IPv4 addresses range from 0.0.0.0 to 255.255.255.255,
  // IP addresses are assigned based on regional allocations, but they're not tied directly to the country code.
  //IP addresses do not necessarily have the same first three digits.
  //The first few digits of an IP address typically denote the network or the organization that manages the IP address block, rather than the country itself.
  return (
    Math.floor(Math.random() * 256) +
    '.' +
    Math.floor(Math.random() * 256) +
    '.' +
    Math.floor(Math.random() * 256) +
    '.' +
    Math.floor(Math.random() * 256)
  );
}
