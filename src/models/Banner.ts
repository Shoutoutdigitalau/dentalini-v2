import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  highlight: { type: String },
  description: { type: String },
  buttonText: { type: String, default: 'Book Appointment' },
  image: { type: String },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true }
}, { timestamps: true });

if (mongoose.models.Banner) {
  delete mongoose.models.Banner;
}

export default mongoose.model('Banner', BannerSchema);
