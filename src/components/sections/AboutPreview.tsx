import { Button } from "../ui/button";
import Link from "next/link";

interface AboutData {
  heading: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  yearsLabel: string;
  startYear: number;
}

const defaultDescription = `<p>At Dentalini we believe that everybody deserves good health. It's all about giving you quality treatment by Dentists that are experienced, gentle and accessible for adults and children.</p><p>We believe in a holistic approach to dentistry, one which prioritises compassion, enthusiasm and care; putting a patient's needs first. Every patient's treatment plan is unique and tailored to the individual, and revolves around the options we can provide based on what they would like to achieve, while also considering their personal and financial circumstances.</p><p>We offer a range of general dental health procedures to ensure teeth are in optimum condition. We strongly believe that prevention is better than cure. The key to successful oral health is identifying and treating potential problems before they become an issue.</p><p>We use the latest innovative procedures to repair tooth decay, tooth trauma or any disease of the teeth and gums. The goal is to prevent, uncover or treat problems as early as possible.</p><p>The practice has state-of-art machines including in-house CBCT (3-D X-ray) machine, Intra-Oral scanner and Philips Zoom Teeth Whitening.</p>`;

const defaults: AboutData = {
  heading: "Who We Are",
  description: defaultDescription,
  image: "/thumbnail_teeth2.jpg",
  buttonText: "Learn More",
  buttonLink: "#",
  yearsLabel: "Years of Well-Established Practice",
  startYear: 2013
};

const AboutPreview = ({ about }: { about?: AboutData | null }) => {
  const data = about && about.description ? about : defaults;

  return (
    <div className="">
      <section className="container mx-auto py-8 md:py-16 px-4" aria-labelledby="about-heading">
        <div className="grid items-center gap-8 md:gap-16 lg:gap-[120px] md:grid-cols-2">
          <div className="h-full aspect-square relative order-2 md:order-1">
            <div className="w-full h-full p-1 bg-white rounded-full relative z-10">
              <img className="w-full h-full object-cover rounded-full" src={data.image} alt="" />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-[#0091BA]/0 via-[#0091BA]/30 to-[#0091BA] rounded-full w-full h-full"></div>
            <div className="w-[120px] md:w-[150px] lg:w-[190px] aspect-square bg-white p-2 absolute -bottom-[15px] md:-bottom-[20px] -right-[15px] md:-right-[20px] z-10 rounded-full">
              <div className="bg-[#0E2F80] w-full h-full text-white flex flex-col justify-center items-center rounded-full">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                  {new Date().getFullYear() - data.startYear}+
                </h3>
                <p className="text-xs md:text-sm text-center px-2">{data.yearsLabel}</p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 id="about-heading" className="mb-3 text-2xl md:text-3xl font-semibold text-primary">
              {data.heading}
            </h2>
            <div
              className="space-y-3 md:space-y-2 text-sm md:text-base text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
            <Link href={data.buttonLink}>
              <Button variant="hero" size="lg" className="mt-6 md:mt-10 w-full sm:w-auto">
                {data.buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPreview;
