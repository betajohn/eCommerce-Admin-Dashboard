import mongoose from 'mongoose';

export interface PageViewType {
  timestamp: Date;
  path: string;
  ip: string;
  geo:
    | {
        city?: string | undefined;
        country?: string | undefined;
        region?: string | undefined;
        latitude?: string | undefined;
        longitude?: string | undefined;
      }
    | undefined;
  referrer: string;
}

const PageViewSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  path: { type: String },
  ip: { type: String, default: 'localhost' },
  geo: {
    type: {
      city: { type: String },
      country: { type: String },
      region: { type: String },
      latitude: { type: String },
      longitude: { type: String },
    },
  },
  referrer: { type: String },
});

const PageViewModel =
  mongoose.models?.PageView || mongoose.model('PageView', PageViewSchema);

export { PageViewModel };
