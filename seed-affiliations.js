
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ashaduzzaman2002_db_user:4lQGAcrrqr7R4Qa4@cluster0.dstnfdd.mongodb.net/?appName=Cluster0';


const affiliations = [
  {
    name: "Australian Academy of Dento-Facial Aesthetics",
    logo: "/affiliations/aadfa-logo.png",
    url: "https://www.aadfa.org.au",
    order: 1
  },
  {
    name: "Australian Dental Association",
    logo: "/affiliations/ada_logo_blue-2eff46.png",
    url: "https://www.ada.org.au",
    order: 2
  },
  {
    name: "Australasian Osseointegration Society (AOS)",
    logo: "/affiliations/AOSlogo.jpg",
    url: "https://aos.org.au",
    order: 3
  },
  {
    name: "HICAPS",
    logo: "/affiliations/hicaps-logo.png",
    url: "https://www.hicaps.com.au",
    order: 4
  },
  {
    name: "Praktika",
    logo: "/affiliations/practika.png",
    url: "https://www.praktika.com.au",
    order: 5
  },
  {
    name: "Total Lifestyle Credit (TLC)",
    logo: "/affiliations/tlc.png",
    url: "https://tlc.com.au",
    order: 6
  },
  {
    name: "CBHS Health Fund",
    logo: "/affiliations/rebrand-logo.svg",
    url: "https://www.cbhs.com.au",
    order: 7
  },
  {
    name: "Smile.com.au",
    logo: "/affiliations/smile.webp",
    url: "https://www.smile.com.au",
    order: 8
  },
  {
    name: "Health Engine",
    logo: "/affiliations/healthengine.png",
    url: "https://www.healthengine.com.au",
    order: 9
  },
  {
    name: "SuperCare",
    logo: "/affiliations/SuperCare-Superannuation-Access-logo.png",
    url: "https://www.mysupercare.com.au",
    order: 10
  }
];

const AffiliationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  url: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Affiliation = mongoose.models.Affiliation || mongoose.model('Affiliation', AffiliationSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Affiliation.deleteMany({});
    console.log('Cleared existing affiliations');

    await Affiliation.insertMany(affiliations);
    console.log('Seeded affiliations successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding affiliations:', error);
    process.exit(1);
  }
}

seed();
