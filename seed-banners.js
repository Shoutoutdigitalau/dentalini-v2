const { default: mongoose } = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ashaduzzaman2002_db_user:4lQGAcrrqr7R4Qa4@cluster0.dstnfdd.mongodb.net/?appName=Cluster0';

const BannerSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  highlight: String,
  description: String,
  buttonText: String,
  image: String,
  order: Number,
  published: Boolean
}, { timestamps: true });

const Banner = mongoose.model('Banner', BannerSchema);

const banners = [
  {
    title: "Experience and Quality",
    subtitle: "Treatment You can",
    highlight: "Trust.",
    description: "",
    buttonText: "Book Appointment",
    image: "/hero-image.jpg",
    order: 0,
    published: true
  },
  {
    title: "Book your check-up",
    subtitle: "& clean",
    highlight: "now.",
    description: "New patient special of $290 for Comprehensive Examination, Consultation, Scale & Polish, Fluoride Application and OPG. **Returning patient special of $175 for Comprehensive Examination, Consultation, Scale & Polish and Fluoride Application.",
    buttonText: "Book Now",
    image: "/images/General.jpg",
    order: 1,
    published: true
  },
  {
    title: "Missing teeth?",
    subtitle: "Let's fix",
    highlight: "that!",
    description: "Don't let a missing tooth falter your smile. Enquire now for your free implant consult.",
    buttonText: "Book Free Consult",
    image: "/Website/General 2.jpg",
    order: 2,
    published: true
  },
  {
    title: "Considering",
    subtitle: "Veneers?",
    highlight: "",
    description: "Enquire now for your free consult.",
    buttonText: "Book Free Consult",
    image: "/hero-image.jpg",
    order: 3,
    published: true
  },
  {
    title: "Smile with confidence",
    subtitle: "with Philips Zoom",
    highlight: "Whitening",
    description: "In-chair whitening for $850. ** Take Home Whitening for $350.",
    buttonText: "Book Treatment",
    image: "/images/ComesticBanayanWebsitePic-1_1_.jpg",
    order: 4,
    published: true
  }
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  await Banner.deleteMany({});
  await Banner.insertMany(banners);
  console.log('Seeded', banners.length, 'banners');
  await mongoose.disconnect();
}

seed().catch(console.error);
