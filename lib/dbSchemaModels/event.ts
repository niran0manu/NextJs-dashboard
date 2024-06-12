import mongoose, { Document, Schema } from 'mongoose';

interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  time: string;
  images: string[];
  categories: string[];
  business: mongoose.Schema.Types.ObjectId;
  location: {
    latitude: number;
    longitude: number;
    additionalInfo?: string;
  };
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  images: [{ type: String }],
  categories: [{ type: String }],
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    additionalInfo: { type: String },
  },
});

export default mongoose.model<IEvent>('Event', EventSchema);
