import mongoose, { Document, Schema } from 'mongoose';

interface IAuthor extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatarUrl?: string;
}

const authorSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type: String,
        required: true,
      },
    bio: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Author = mongoose.models.Author || mongoose.model<IAuthor>('Author', authorSchema);

export default Author;
