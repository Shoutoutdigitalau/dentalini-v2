import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  featured: { type: Boolean, default: false },
  metaTitle: { type: String },
  metaDescription: { type: String },
  metaKeywords: { type: String },
  beforeAfterImages: [{
    before: String,
    after: String
  }],
  published: { type: Boolean, default: true }
}, { timestamps: true });

// Delete existing model if it exists to ensure schema updates
if (mongoose.models.Service) {
  delete mongoose.models.Service;
}

export default mongoose.model('Service', ServiceSchema);
