const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ashaduzzaman2002_db_user:4lQGAcrrqr7R4Qa4@cluster0.dstnfdd.mongodb.net/?appName=Cluster0';


const teamMembers = [
  {
    name: "Dr. Preeti R. Bharadwaj",
    role: "B.D.S, Grad Dip Clin Dent (Oral Implants) (Uni of Syd)",
    image: "/team/DSC_0192.JPG",
    description: `Dr. Preeti Bharadwaj is the owner and principal dentist at Dentalini since 2013. She completed her Bachelor of Dental Surgery in 2004 from Rajiv Gandhi University of Health Sciences, Bengaluru, India. Succeeding 3 years of work in India, she moved to Sydney where she completed Australian Dental Council exams and registered as a dentist. Her passion to improve function along with patient confidence led her to complete Graduate Diploma in Clinical Dentistry (Oral Implants) from University of Sydney.

Preeti is a member of Australian Dental Association (ADA), Australasian Osseointegration Society (AOS), Australasian Academy of Dento-Facial Aesthetics (AADFA) and is strong believer of continuing education completing many professional development courses.

With her calm nature, Preeti aims to reduce fear of dentistry and hopes to increase dental awareness by explaining cause & effect of dental hygiene. With a particular interest in reconstructive dentistry, she continues to look for safe & innovative solutions in general dental care because of her experience in a variety of procedures & treatments.

Dr. Preeti is happily married with 2 daughters. She enjoys travelling with her husband, Suraj, and dancing with her girls – Annika & Ishika. In her free time, she dabbles in gardening and watching movies.`,
    order: 0,
    isPrincipal: true
  },
  {
    name: "Hannah Powell",
    role: "Dental Assistant",
    image: "/team/Hannah Powell.jpg",
    description: `Hi, I'm Hannah! I have been a dental assistant with Dentalini since 2020. I work alongside Dr. Preeti to help provide care from general check-ups all the way up to dental implant surgeries. I love to have a chat with our patients and make them feel comfortable during their treatment. Outside of work, I enjoy crochet and sewing.`,
    order: 1,
    isPrincipal: false
  },
  {
    name: "Angelina Talevski",
    role: "Receptionist",
    image: "/team/Angelina Talevski.jpg",
    description: `I am a Law and Commerce student at UNSW and the receptionist here at Dentalini. I handle appointment scheduling, patient enquiries and keep things running smoothly at the front desk. I enjoy being a part of the lovely Dentalini team and helping patients feel comfortable and cared for from the moment they walk in.`,
    order: 2,
    isPrincipal: false
  },
  {
    name: "Yeasmin Akter Hiya",
    role: "Dental Assistant",
    image: "/team/Yeasmin Akter Hiya.jpg",
    description: `My name is Yeasmin and I am currently working as a Dental Assistant at Dentalini. I have completed my Certificate III in Dental Assisting, which has helped me develop strong clinical and patient care skills. I enjoy supporting the dental team to provide high-quality treatment and creating a comfortable experience for patients. Outside of work, I enjoy listening to music and spending time relaxing with family and friends.`,
    order: 3,
    isPrincipal: false
  }
];

async function seedTeam() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const TeamSchema = new mongoose.Schema({
      name: { type: String, required: true },
      role: { type: String, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
      order: { type: Number, default: 0 },
      isPrincipal: { type: Boolean, default: false }
    }, { timestamps: true });

    const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);

    await Team.deleteMany({});
    console.log('Cleared existing team members');

    await Team.insertMany(teamMembers);
    console.log('Seeded team members successfully');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding team:', error);
    process.exit(1);
  }
}

seedTeam();
