import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  beforeAfterImages: [{
    before: String,
    after: String
  }],
  published: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
