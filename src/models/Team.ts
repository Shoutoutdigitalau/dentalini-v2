import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
  isPrincipal: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
