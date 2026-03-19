import mongoose from 'mongoose';

const AboutSectionSchema = new mongoose.Schema({
  heading: { type: String, default: 'Who We Are' },
  description: { type: String, default: '' },
  image: { type: String, default: '/thumbnail_teeth2.jpg' },
  buttonText: { type: String, default: 'Learn More' },
  buttonLink: { type: String, default: '#' },
  yearsLabel: { type: String, default: 'Years of Well-Established Practice' },
  startYear: { type: Number, default: 2013 }
}, { timestamps: true });

if (mongoose.models.AboutSection) {
  delete mongoose.models.AboutSection;
}

export default mongoose.model('AboutSection', AboutSectionSchema);
