const { default: mongoose } = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ashaduzzaman2002_db_user:4lQGAcrrqr7R4Qa4@cluster0.dstnfdd.mongodb.net/?appName=Cluster0';

const AboutSectionSchema = new mongoose.Schema({
  heading: String,
  description: String,
  image: String,
  buttonText: String,
  buttonLink: String,
  yearsLabel: String,
  startYear: Number
}, { timestamps: true });

const AboutSection = mongoose.model('AboutSection', AboutSectionSchema);

const about = {
  heading: "Who We Are",
  description: "<p>At Dentalini we believe that everybody deserves good health. It's all about giving you quality treatment by Dentists that are experienced, gentle and accessible for adults and children.</p><p>We believe in a holistic approach to dentistry, one which prioritises compassion, enthusiasm and care; putting a patient's needs first. Every patient's treatment plan is unique and tailored to the individual, and revolves around the options we can provide based on what they would like to achieve, while also considering their personal and financial circumstances.</p><p>We offer a range of general dental health procedures to ensure teeth are in optimum condition. We strongly believe that prevention is better than cure. The key to successful oral health is identifying and treating potential problems before they become an issue.</p><p>We use the latest innovative procedures to repair tooth decay, tooth trauma or any disease of the teeth and gums. The goal is to prevent, uncover or treat problems as early as possible.</p><p>The practice has state-of-art machines including in-house CBCT (3-D X-ray) machine, Intra-Oral scanner and Philips Zoom Teeth Whitening.</p>",
  image: "/thumbnail_teeth2.jpg",
  buttonText: "Learn More",
  buttonLink: "#",
  yearsLabel: "Years of Well-Established Practice",
  startYear: 2013
};

async function seed() {
  await mongoose.connect(MONGODB_URI);
  await AboutSection.deleteMany({});
  await AboutSection.create(about);
  console.log('Seeded about section');
  await mongoose.disconnect();
}

seed().catch(console.error);
