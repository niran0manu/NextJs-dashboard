import mongoose, { Document, Schema } from 'mongoose';

interface IBusiness extends Document {
  name: string;
  address: string;
  contactInfo: string;
  logo: string;
  operatingHours: string;
  capacity: number;
  userRatings: number[];
  reviews: string[];
  location: {
    latitude: number;
    longitude: number;
    additionalInfo?: string;
  };
}

const BusinessSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactInfo: { type: String, required: true },
  logo: { type: String },
  operatingHours: { type: String },
  capacity: { type: Number },
  userRatings: [{ type: Number }],
  reviews: [{ type: String }],
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    additionalInfo: { type: String },
  },
});

export default mongoose.model<IBusiness>('Business', BusinessSchema);
