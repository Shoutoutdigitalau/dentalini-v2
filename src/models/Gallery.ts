import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  beforeImage: { type: String, required: true },
  afterImage: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
