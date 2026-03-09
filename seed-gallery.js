const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ashaduzzaman2002_db_user:4lQGAcrrqr7R4Qa4@cluster0.dstnfdd.mongodb.net/?appName=Cluster0';

const galleryData = [
  // Dental Implants
  {
    category: "Dental Implants",
    title: "Single Implant Treatment",
    beforeImage: "/Website/Implant/Single Implant cases/Pt 3/Before 1.JPG",
    afterImage: "/Website/Implant/Single Implant cases/Pt 3/After 1.JPG",
    order: 1
  },
  {
    category: "Dental Implants",
    title: "Single Implant Treatment",
    beforeImage: "/Website/Implant/Single Implant cases/Pt 5/Before 1.JPG",
    afterImage: "/Website/Implant/Single Implant cases/Pt 5/After 1.JPG",
    order: 2
  },
  {
    category: "Dental Implants",
    title: "Full Arch Implant Treatment",
    beforeImage: "/Website/Implant/Full arch cases/Pt 2/Before 1.JPG",
    afterImage: "/Website/Implant/Full arch cases/Pt 2/After 1.JPG",
    order: 3
  },
  {
    category: "Dental Implants",
    title: "Implant Smile Make-Over",
    beforeImage: "/Website/Implant/Smile Make-Over/Pt 1/Before 1.JPG",
    afterImage: "/Website/Implant/Smile Make-Over/Pt 1/After 1.JPG",
    order: 4
  },
  // Orthodontics
  {
    category: "Orthodontics",
    title: "Orthodontic Treatment",
    beforeImage: "/Orthodontics/Pt 1/DSC_1795.JPG",
    afterImage: "/Orthodontics/Pt 1/After.JPG",
    order: 1
  },
  {
    category: "Orthodontics",
    title: "Orthodontic Treatment",
    beforeImage: "/Orthodontics/Pt 2/Before.JPG",
    afterImage: "/Orthodontics/Pt 2/After.JPG",
    order: 2
  },
  {
    category: "Orthodontics",
    title: "Orthodontic Treatment",
    beforeImage: "/Orthodontics/Pt 3/Before.JPG",
    afterImage: "/Orthodontics/Pt 3/After.JPG",
    order: 3
  },
  {
    category: "Orthodontics",
    title: "Orthodontic Treatment",
    beforeImage: "/Orthodontics/Pt 4/Before.JPG",
    afterImage: "/Orthodontics/Pt 4/After.JPG",
    order: 4
  },
  {
    category: "Orthodontics",
    title: "Orthodontic Treatment",
    beforeImage: "/Orthodontics/Pt 5/Before.JPG",
    afterImage: "/Orthodontics/Pt 5/After.JPG",
    order: 5
  },
  {
    category: "Orthodontics",
    title: "Orthodontic Treatment",
    beforeImage: "/Orthodontics/Pt 6/Before.JPG",
    afterImage: "/Orthodontics/Pt 6/After.JPG",
    order: 6
  },
  {
    category: "Orthodontics",
    title: "Orthodontic Treatment",
    beforeImage: "/Orthodontics/Pt 7/Before.JPG",
    afterImage: "/Orthodontics/Pt 7/After.JPG",
    order: 7
  },
  // Caries
  {
    category: "Caries",
    title: "Caries Treatment",
    beforeImage: "/Caries/Pt 2/DSC_1026.JPG",
    afterImage: "/Caries/Pt 2/DSC_1031.JPG",
    order: 1
  },
  {
    category: "Caries",
    title: "Caries Treatment",
    beforeImage: "/Caries/Pt 3/DSC_0016.JPG",
    afterImage: "/Caries/Pt 3/DSC_0020.JPG",
    order: 2
  },
  // Crown & Bridge
  {
    category: "Crown & Bridge",
    title: "Crown & Bridge",
    beforeImage: "/Crown & Bridge/Pt 1/After.JPG",
    afterImage: "/Crown & Bridge/Pt 1/Before.JPG",
    order: 1
  },
  {
    category: "Crown & Bridge",
    title: "Crown & Bridge",
    beforeImage: "/Crown & Bridge/Pt 2/DSC_1503.JPG",
    afterImage: "/Crown & Bridge/Pt 2/DSC_1510.JPG",
    order: 2
  },
  // Hygiene
  {
    category: "Hygiene",
    title: "Dental Hygiene",
    beforeImage: "/Hygiene/DSC_1007.JPG",
    afterImage: "/Hygiene/DSC_1014.JPG",
    order: 1
  }
];

async function seedGallery() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const GallerySchema = new mongoose.Schema({
      category: { type: String, required: true },
      title: { type: String, required: true },
      beforeImage: { type: String, required: true },
      afterImage: { type: String, required: true },
      order: { type: Number, default: 0 }
    }, { timestamps: true });

    const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

    await Gallery.deleteMany({});
    console.log('Cleared existing gallery items');

    await Gallery.insertMany(galleryData);
    console.log('Seeded gallery items successfully');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding gallery:', error);
    process.exit(1);
  }
}

seedGallery();
