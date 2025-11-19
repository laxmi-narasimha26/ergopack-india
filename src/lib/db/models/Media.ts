import mongoose, { Schema, Model } from 'mongoose';
import { Media } from '@/types';

const MediaSchema = new Schema<Media>(
  {
    filename: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['image', 'video', '3d-model', 'document'],
      required: true,
    },
    folder: String,
    alt: String,
    caption: String,
    tags: [String],
  },
  {
    timestamps: true,
  }
);

export const MediaModel: Model<Media> =
  mongoose.models.Media || mongoose.model<Media>('Media', MediaSchema);
