import SubHeader from "@/components/layout/SubHeader";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const doctor = {
  name: "Dr. Preeti R. Bharadwaj",
  role: "B.D.S, Grad Dip Clin Dent (Oral Implants) (Uni of Syd)",
  image: "/team/DSC_0064.jpg",
  description: `Dr. Preeti Bharadwaj is the owner and principal dentist at Dentalini since 2013. She completed her Bachelor of Dental Surgery in 2004 from Rajiv Gandhi University of Health Sciences, Bengaluru, India. Succeeding 3 years of work in India, she moved to Sydney where she completed Australian Dental Council exams and registered as a dentist. Her passion to improve function along with patient confidence led her to complete Graduate Diploma in Clinical Dentistry (Oral Implants) from University of Sydney.

Preeti is a member of Australian Dental Association (ADA), Australasian Osseointegration Society (AOS), Australasian Academy of Dento-Facial Aesthetics (AADFA) and is strong believer of continuing education completing many professional development courses.

With her calm nature, Preeti aims to reduce fear of dentistry and hopes to increase dental awareness by explaining cause & effect of dental hygiene. With a particular interest in reconstructive dentistry, she continues to look for safe & innovative solutions in general dental care because of her experience in a variety of procedures & treatments.

Dr. Preeti is happily married with 2 daughters. She enjoys travelling with her husband, Suraj, and dancing with her girls – Annika & Ishika. In her free time, she dabbles in gardening and watching movies.`
};

const staff = [
  {
    name: "Hannah Powell",
    role: "Dental Assistant",
    image: "/team/Hannah Powell.jpg",
    description: `Hi, I'm Hannah! I have been a dental assistant with Dentalini since 2020. I work alongside Dr. Preeti to help provide care from general check-ups all the way up to dental implant surgeries. I love to have a chat with our patients and make them feel comfortable during their treatment. Outside of work, I enjoy crochet and sewing.`
  },
  {
    name: "Angelina Talevski",
    role: "Receptionist",
    image: "/team/Angelina Talevski.jpg",
    description: `I am a Law and Commerce student at UNSW and the receptionist here at Dentalini. I handle appointment scheduling, patient enquiries and keep things running smoothly at the front desk. I enjoy being a part of the lovely Dentalini team and helping patients feel comfortable and cared for from the moment they walk in.`
  },
  {
    name: "Yeasmin Akter Hiya",
    role: "Dental Assistant",
    image: "/team/Yeasmin Akter Hiya.jpg",
    description: `My name is Yeasmin and I am currently working as a Dental Assistant at Dentalini. I have completed my Certificate III in Dental Assisting, which has helped me develop strong clinical and patient care skills. I enjoy supporting the dental team to provide high-quality treatment and creating a comfortable experience for patients. Outside of work, I enjoy listening to music and spending time relaxing with family and friends.`
  }
];

const Team = () => (

  <div>
    <SubHeader
      title="Meet Our Team"
      description="Meet the specialists who make your dental experience truly exceptional."
    />
    <section className="container mx-auto py-8 md:py-12 px-4">


      {/* Doctor Section */}
      <Card className="mb-8 md:mb-16 overflow-hidden border-none">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px]">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={350}
                height={350}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          </div>
          <CardContent className="flex flex-col justify-center p-4 lg:p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-primary mb-2 text-center lg:text-left">{doctor.name}</h2>
            <p className="text-sm md:text-base text-primary font-medium mb-4 text-center lg:text-left">{doctor.role}</p>
            <p className="text-sm md:text-base text-muted-foreground whitespace-pre-line leading-relaxed text-center lg:text-left">
              {doctor.description}
            </p>
          </CardContent>
        </div>
      </Card>

      {/* Staff Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {staff.map((member) => (
          <Card key={member.name} className="overflow-hidden shadow-md">
            <div className="relative p-4 md:p-6">
              <div className="flex justify-center mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={180}
                  height={180}
                  className="object-cover w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] rounded-full"
                />
              </div>
              <CardContent className="p-0">
                <h3 className="text-lg md:text-xl font-semibold text-primary mb-1 text-center">{member.name}</h3>
                <p className="text-sm md:text-base text-primary font-medium mb-3 text-center">{member.role}</p>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed text-center">
                  {member.description}
                </p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </section>
  </div>
);

export default Team;
