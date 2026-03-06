const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ashaduzzaman2002_db_user:4lQGAcrrqr7R4Qa4@cluster0.dstnfdd.mongodb.net/?appName=Cluster0';

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

const faqsData = [
  // General Dental Care
  { question: "What is plaque?", answer: "Plaque is a thin, sticky, colourless deposit of bacteria that constantly forms on everyone's teeth.", category: "General Dental Care", order: 1 },
  { question: "What causes decay?", answer: "Decay is caused by dental plaque. When food is eaten, the bacteria in plaque use the food to produce acids that attack the tooth enamel. After repeated acid attacks, the enamel breaks down and a cavity (hole) is formed. This cavity is the decay. They can occur on any surface of the tooth.", category: "General Dental Care", order: 2 },
  { question: "Why is fluoride so important?", answer: "Fluoride dramatically decreases your chances of getting cavities by making teeth stronger. Fluoride helps to remineralise the lost tooth structure and so also helps to stop cavities in its initial stages. Fluoride in the drinking water is the best and easiest way to get it. Other sources of fluoride are from toothpaste and at the dentist who uses fluoride after every scale (clean).", category: "General Dental Care", order: 3 },
  { question: "What is a fissure sealant?", answer: "A fissure sealant is a clear or shaded material that is applied to the chewing surfaces of the back teeth (premolars and molars) where decay occurs most often. This sealant acts as a barrier, protecting the decay prone areas of the back teeth from plaque and acid. No drilling is required to place this sealant.", category: "General Dental Care", order: 4 },
  { question: "Should I worry about thumb or finger sucking?", answer: "Thumb sucking is perfectly normal for infants and most children stop thumb/finger sucking by age two. If your child does not stop thumb sucking, try to discourage it by age four. Prolonged thumb sucking can create crowded, crooked teeth, bite problems and a very narrow jaw arch line. We can suggest ways to address a prolonged thumb sucking habit.", category: "General Dental Care", order: 5 },
  { question: "Can an eating disorder affect my dental hygiene?", answer: "<p>Frequent vomiting by people with an eating disorder can cause both short- and long-term damage to dental health.</p><p class='mt-2'>If you have an eating disorder, it is important that you understand the consequences of frequent vomiting and what you can do to minimise dental damage.</p>", category: "General Dental Care", order: 6 },

  // Dental Implants
  { question: "What are Dental implants?", answer: "Dental Implant is a titanium screw that is inserted in the bone, where a tooth has been lost. Implants secure the placement of your new replacement tooth (crown) and help retain the alignment of your surrounding teeth.", category: "Dental Implants", order: 1 },
  { question: "Will my implant supported teeth be uncomfortable and push on my gum tissue like a partial or a full denture does?", answer: "No. Your implant-supported teeth are fixed in place. They will not slip and do not need to be removed for cleaning. They do not press on the gum tissue and therefore do not create any of the discomfort common with dentures.", category: "Dental Implants", order: 2 },
  { question: "Can people tell if I have had dental implants?", answer: "An initial examination assesses your smile to determine the location of the junction between the fixed bridge and the jawbone. We are able to adjust your smile line during the procedure to make sure your new smile is not too gummy and that the top (or bottom) of your prosthesis is completely hidden. Also, the implant crown will be matched to the shade, shape and of your teeth to make it look as natural as possible.", category: "Dental Implants", order: 3 },
  { question: "How will it affect my diet? When can I eat solid food again?", answer: "Solid foods can be eaten the same day – but not all solid food. Initially you must follow a modified soft food diet. Examples include scrambled eggs, mashed potatoes, chicken, fish, rice and pasta. Avoid foods that require tearing or biting with front teeth (pizza, sandwiches, fruit), especially if the implant is for any front tooth. Avoid hard foods such as carrots, biscuits, chips, apples, nuts and chewing gum. The modified diet applies until you receive your permanent prosthesis (usually about 3-6 months).", category: "Dental Implants", order: 4 },
  { question: "Why do I have to wear a provisional set of teeth and not my permanent new teeth right away?", answer: "On the day of your procedure, we place the implants and a new set of teeth called a long-term provisional prosthesis. This provisional set is made entirely of acrylic resin, which places less stress on your new implants during their first few months. Once your gums have healed and the implants are completely stable (usually about 3-6 months) we fabricate a permanent bridge with a titanium framework inside.", category: "Dental Implants", order: 5 },
  { question: "If I need both upper and lower full-arch replacements, do they both have to be done at the same time?", answer: "The best way to control your biting plane and bite is to do both at the same time. Also, it means shorter term discomfort and fewer visits to the dentist. However, treatment can be sequenced to meet the financial, health or other individual needs of the patient.", category: "Dental Implants", order: 6 },

  // Cosmetic Dentistry
  { question: "What can Crowns and Bridges do for my smile?", answer: "Crowns can improve your smile by covering cracks and chips in your natural tooth with a ceramic sleeve. Also, crowns are required after RCT to protect and support the tooth. Bridges can close a gap in the smile, with an artificial tooth secured between two crowns that fit over the natural teeth next to the vacancy.", category: "Cosmetic Dentistry", order: 1 },
  { question: "What are Veneers?", answer: "Veneers are porcelain shells that are placed over discoloured, stained, chipped or cracked teeth. This shell will match your natural tooth colour and shape and improve the appearance of your teeth.", category: "Cosmetic Dentistry", order: 2 },
  { question: "How can bonding fix my smile?", answer: "Resin Bonding can improve chips, cracks or discolouration of the teeth. Using a tooth-coloured adhesive (filling), we can cover chips/change colour or shape of tooth using a layering technique. The resin composite is then hardened and set by a heat-activated light and polished to blend with the natural tooth surface.", category: "Cosmetic Dentistry", order: 3 },
  { question: "Do you provide teeth whitening?", answer: "Yes, we provide take home tray treatment or in office tooth whitening. Tray whitening is administered in a custom-made tray for patients to use at home. In office whitening is administered in the dental chair with cool blue LED light to activate the process. We use Philips Zoom, the most trusted brand in the industry.", category: "Cosmetic Dentistry", order: 4 },
  { question: "How do you get rid of staining?", answer: "Staining treatment depends on the source. Superficial stains from coffee, tea, smoking, or tartar may be removed with a professional clean. Deeper stains may require whitening or restorations like bonding, porcelain veneers or crowns. Internal stains from tooth defects or antibiotics can only be covered with veneers or crowns.", category: "Cosmetic Dentistry", order: 5 },

  // Porcelain Veneers & Crowns
  { question: "What are porcelain veneers?", answer: "Porcelain veneers are thin porcelain facings that are permanently bonded to the outer surfaces of teeth. They have the ability to change the colour, shape and alignment of teeth on which they are placed.", category: "Porcelain Veneers & Crowns", order: 1 },
  { question: "What are porcelain dental crowns?", answer: "Porcelain crowns are similar to veneers but cover the entire tooth. They are often required when substantial tooth structure has been lost (e.g. broken teeth, root-filled teeth). The appearance is identical to veneers when viewed in a smile.", category: "Porcelain Veneers & Crowns", order: 2 },
  { question: "Do I need a porcelain veneer or a crown?", answer: "We evaluate each tooth individually and place the restoration most appropriate to each patient's needs. Often in cases involving multiple teeth a combination of porcelain veneers and crowns is placed.", category: "Porcelain Veneers & Crowns", order: 3 },
  { question: "How long do porcelain veneers and crowns last?", answer: "With good home care and regular dental visits the lifespan is usually at least 15 years. Porcelain veneers and crowns are stain resistant and do not discolour at all.", category: "Porcelain Veneers & Crowns", order: 4 },
  { question: "Will the porcelain veneers and crowns look natural?", answer: "At Dentalini our principal aim is to provide beautiful, natural looking smiles. Our training, experience, and artistic eye ensure all porcelain work looks like real teeth. We ensure your complete satisfaction by allowing your input into the design, shape and colour.", category: "Porcelain Veneers & Crowns", order: 5 },
  { question: "How many dental visits are required?", answer: "Porcelain veneers and crowns can usually be completed in 2 or 3 visits. A Digital Smile Design (DSD) may be created first. During the first visit teeth are prepared and provisional restorations are placed, so you leave with a beautiful new smile.", category: "Porcelain Veneers & Crowns", order: 6 },
  { question: "Who is a candidate for Porcelain Veneers and Dental Crowns?", answer: "Virtually anyone wanting to change their teeth's appearance can benefit. They can correct crooked/misaligned teeth, crowding, chips, wear, spaces, and permanent staining. Not suitable for those with unhealthy teeth/gums, severe malocclusions, or under 18 years of age.", category: "Porcelain Veneers & Crowns", order: 7 },

  // Fillings & Treatments
  { question: "What fillings do you use?", answer: "We use tooth-coloured fillings that are safe and durable. They are matched to your tooth colour and are virtually invisible. They are a modern choice to ensure your bright smile and secure your oral health.", category: "Fillings & Treatments", order: 1 },
  { question: "Why should I consider tooth-coloured fillings?", answer: "Traditional amalgam fillings can be quite visible when you laugh or smile. White fillings are virtually invisible and made of glass particles, synthetic resin and a setting ingredient. With advances in materials, they can be placed on any tooth.", category: "Fillings & Treatments", order: 2 },
  { question: "Should I replace my silver amalgam fillings with white ones?", answer: "It is usually best to change fillings only when an old filling needs replacing. If so, you can ask to have it replaced in a tooth-coloured material.", category: "Fillings & Treatments", order: 3 },
  { question: "How do I know if I need Root Canal Treatment?", answer: "You will likely require Root Canal Treatment if you have a painful tooth, red or swollen gums, pus in the area of pain, pain when chewing or biting, and notice looseness of the tooth. These are signs of infection in the tooth's pulp that needs immediate treatment.", category: "Fillings & Treatments", order: 4 },

  // Gum Disease & Periodontal Care
  { question: "What is gum disease?", answer: "Gum disease is inflammation caused by plaque and tartar buildup which releases toxins into the gum area. It's the biggest cause of tooth loss in adults. Symptoms include red swollen gums, bleeding when brushing, bad breath, tartar buildup, shrinking gums, loose teeth, and pus from gums.", category: "Gum Disease & Periodontal Care", order: 1 },
  { question: "How can I fix gum disease?", answer: "Treatment depends on how advanced the disease is. The most common treatment is professional scaling to remove plaque and calculus from above and below gum margins. Severe cases require multiple cleans and sometimes specialist care with a Periodontist.", category: "Gum Disease & Periodontal Care", order: 2 },
  { question: "What is Periodontal treatment?", answer: "Periodontal treatment is for advanced gum disease. We tailor preventative programs to avoid reaching this stage. If patients show bleeding, pain, deeper gum pockets or abscesses, we deep scale and clean calculus. When condition deteriorates further, surgery may be needed.", category: "Gum Disease & Periodontal Care", order: 3 },

  // Practice Information
  { question: "Do you autoclave all your instruments? What infection control procedures do you take?", answer: "Yes, we autoclave all instruments and dispose of single use equipment every time. During autoclaving, steam penetrates enclosed items at extreme temperatures for a set time. We keep constant tracking of sterilization steps to ensure successful sterilization.", category: "Practice Information", order: 1 },
  { question: "How often should I have dental visits?", answer: "Depending upon your oral health risks, we recommend examinations either once or twice a year. Our aim is for your mouth to be healthy and stable so your teeth last a lifetime with minimum worries, complications, and cost.", category: "Practice Information", order: 2 },
  { question: "Why should I have regular dental visits?", answer: "There's no reason why healthy teeth cannot stay filling free for a lifetime with the correct approach. By having regular examinations, we identify risk factors and take necessary actions early. Decay doesn't happen overnight - early identification saves time, discomfort and cost.", category: "Practice Information", order: 3 },
  { question: "Why does it feel like that every time I visit a dentist more treatment is required?", answer: "As a practice with preventive philosophy, we strive to minimize required treatment. Not all treatment has the same priority. For all proposed treatment we truthfully inform you whether it's urgent, beneficial over the longer term, or completely optional.", category: "Practice Information", order: 4 },
  { question: "Do you offer gentle care for anxious patients?", answer: "Absolutely. We explain each step, use comfort-first techniques, and create a calm, feminine environment.", category: "Practice Information", order: 5 },
  { question: "Do you accept new patients?", answer: "Yes! We welcome new patients and tailor visits to your needs.", category: "Practice Information", order: 6 },
  { question: "What payment options are available?", answer: "We accept major cards and offer flexible plans for select treatments.", category: "Practice Information", order: 7 }
];

async function seedFAQs() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await FAQ.deleteMany({});
    console.log('Cleared existing FAQs');

    await FAQ.insertMany(faqsData);
    console.log(`Seeded ${faqsData.length} FAQs`);

    await mongoose.connection.close();
    console.log('Done!');
  } catch (error) {
    console.error('Error seeding FAQs:', error);
    process.exit(1);
  }
}

seedFAQs();
