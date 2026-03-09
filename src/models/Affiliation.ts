import mongoose from 'mongoose';

const AffiliationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  url: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Affiliation || mongoose.model('Affiliation', AffiliationSchema);
