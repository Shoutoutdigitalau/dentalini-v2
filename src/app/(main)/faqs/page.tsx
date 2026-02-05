import SubHeader from "@/components/layout/SubHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faqs = () => (
  <div>
    <SubHeader
      title="Frequently Asked Questions"
      description="If you don't see your question here, we're happy to help by phone or email."
    />
    <section className="container mx-auto py-12 space-y-12 max-w-4xl">
      {/* General Dental Care */}
      <div>
        <h2 className="text-2xl font-bold mb-6">General Dental Care</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="plaque">
            <AccordionTrigger>What is plaque?</AccordionTrigger>
            <AccordionContent>
              Plaque is a thin, sticky, colourless deposit of bacteria that constantly forms on everyone's teeth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="decay">
            <AccordionTrigger>What causes decay?</AccordionTrigger>
            <AccordionContent>
              Decay is caused by dental plaque. When food is eaten, the bacteria in plaque use the food to produce acids that attack the tooth enamel. After repeated acid attacks, the enamel breaks down and a cavity (hole) is formed. This cavity is the decay. They can occur on any surface of the tooth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="fluoride">
            <AccordionTrigger>Why is fluoride so important?</AccordionTrigger>
            <AccordionContent>
              Fluoride dramatically decreases your chances of getting cavities by making teeth stronger. Fluoride helps to remineralise the lost tooth structure and so also helps to stop cavities in its initial stages. Fluoride in the drinking water is the best and easiest way to get it. Other sources of fluoride are from toothpaste and at the dentist who uses fluoride after every scale (clean).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="sealant">
            <AccordionTrigger>What is a fissure sealant?</AccordionTrigger>
            <AccordionContent>
              A fissure sealant is a clear or shaded material that is applied to the chewing surfaces of the back teeth (premolars and molars) where decay occurs most often. This sealant acts as a barrier, protecting the decay prone areas of the back teeth from plaque and acid. No drilling is required to place this sealant.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="thumb-sucking">
            <AccordionTrigger>Should I worry about thumb or finger sucking?</AccordionTrigger>
            <AccordionContent>
              Thumb sucking is perfectly normal for infants and most children stop thumb/finger sucking by age two. If your child does not stop thumb sucking, try to discourage it by age four. Prolonged thumb sucking can create crowded, crooked teeth, bite problems and a very narrow jaw arch line. We can suggest ways to address a prolonged thumb sucking habit.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="eating-disorder">
            <AccordionTrigger>Can an eating disorder affect my dental hygiene?</AccordionTrigger>
            <AccordionContent>
              <p>Frequent vomiting by people with an eating disorder can cause both short- and long-term damage to dental health. </p>
              <p className="mt-2">If you have an eating disorder, it is important that you understand the consequences of frequent vomiting and what you can do to minimise dental damage.</p>
              <p className="mt-3"><a className="text-blue-700 font-semibold underline" href="https://www.dentalini.com.au/images/PDFs/ACF2697.pdf" target="blank">Click here</a> to download more information.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Dental Implants */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Dental Implants</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="what-implants">
            <AccordionTrigger>What are Dental implants?</AccordionTrigger>
            <AccordionContent>
              Dental Implant is a titanium screw that is inserted in the bone, where a tooth has been lost. Implants secure the placement of your new replacement tooth (crown) and help retain the alignment of your surrounding teeth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="implant-comfort">
            <AccordionTrigger>Will my implant supported teeth be uncomfortable and push on my gum tissue like a partial or a full denture does?</AccordionTrigger>
            <AccordionContent>
              No. Your implant-supported teeth are fixed in place. They will not slip and do not need to be removed for cleaning. They do not press on the gum tissue and therefore do not create any of the discomfort common with dentures.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="implant-visible">
            <AccordionTrigger>Can people tell if I have had dental implants?</AccordionTrigger>
            <AccordionContent>
              An initial examination assesses your smile to determine the location of the junction between the fixed bridge and the jawbone. We are able to adjust your smile line during the procedure to make sure your new smile is not too gummy and that the top (or bottom) of your prosthesis is completely hidden. Also, the implant crown will be matched to the shade, shape and of your teeth to make it look as natural as possible.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="implant-diet">
            <AccordionTrigger>How will it affect my diet? When can I eat solid food again?</AccordionTrigger>
            <AccordionContent>
              Solid foods can be eaten the same day – but not all solid food. Initially you must follow a modified soft food diet. Examples include scrambled eggs, mashed potatoes, chicken, fish, rice and pasta. Avoid foods that require tearing or biting with front teeth (pizza, sandwiches, fruit), especially if the implant is for any front tooth. Avoid hard foods such as carrots, biscuits, chips, apples, nuts and chewing gum. The modified diet applies until you receive your permanent prosthesis (usually about 3-6 months).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="provisional-teeth">
            <AccordionTrigger>Why do I have to wear a provisional set of teeth and not my permanent new teeth right away?</AccordionTrigger>
            <AccordionContent>
              On the day of your procedure, we place the implants and a new set of teeth called a long-term provisional prosthesis. This provisional set is made entirely of acrylic resin, which places less stress on your new implants during their first few months. Once your gums have healed and the implants are completely stable (usually about 3-6 months) we fabricate a permanent bridge with a titanium framework inside.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="both-arches">
            <AccordionTrigger>If I need both upper and lower full-arch replacements, do they both have to be done at the same time?</AccordionTrigger>
            <AccordionContent>
              The best way to control your biting plane and bite is to do both at the same time. Also, it means shorter term discomfort and fewer visits to the dentist. However, treatment can be sequenced to meet the financial, health or other individual needs of the patient.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Cosmetic Dentistry */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Cosmetic Dentistry</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="crowns-bridges">
            <AccordionTrigger>What can Crowns and Bridges do for my smile?</AccordionTrigger>
            <AccordionContent>
              Crowns can improve your smile by covering cracks and chips in your natural tooth with a ceramic sleeve. Also, crowns are required after RCT to protect and support the tooth. Bridges can close a gap in the smile, with an artificial tooth secured between two crowns that fit over the natural teeth next to the vacancy.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="veneers">
            <AccordionTrigger>What are Veneers?</AccordionTrigger>
            <AccordionContent>
              Veneers are porcelain shells that are placed over discoloured, stained, chipped or cracked teeth. This shell will match your natural tooth colour and shape and improve the appearance of your teeth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="bonding">
            <AccordionTrigger>How can bonding fix my smile?</AccordionTrigger>
            <AccordionContent>
              Resin Bonding can improve chips, cracks or discolouration of the teeth. Using a tooth-coloured adhesive (filling), we can cover chips/change colour or shape of tooth using a layering technique. The resin composite is then hardened and set by a heat-activated light and polished to blend with the natural tooth surface.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="whitening">
            <AccordionTrigger>Do you provide teeth whitening?</AccordionTrigger>
            <AccordionContent>
              Yes, we provide take home tray treatment or in office tooth whitening. Tray whitening is administered in a custom-made tray for patients to use at home. In office whitening is administered in the dental chair with cool blue LED light to activate the process. We use Philips Zoom, the most trusted brand in the industry.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="staining">
            <AccordionTrigger>How do you get rid of staining?</AccordionTrigger>
            <AccordionContent>
              Staining treatment depends on the source. Superficial stains from coffee, tea, smoking, or tartar may be removed with a professional clean. Deeper stains may require whitening or restorations like bonding, porcelain veneers or crowns. Internal stains from tooth defects or antibiotics can only be covered with veneers or crowns.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Porcelain Veneers & Crowns */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Porcelain Veneers & Crowns</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="porcelain-veneers">
            <AccordionTrigger>What are porcelain veneers?</AccordionTrigger>
            <AccordionContent>
              Porcelain veneers are thin porcelain facings that are permanently bonded to the outer surfaces of teeth. They have the ability to change the colour, shape and alignment of teeth on which they are placed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="porcelain-crowns">
            <AccordionTrigger>What are porcelain dental crowns?</AccordionTrigger>
            <AccordionContent>
              Porcelain crowns are similar to veneers but cover the entire tooth. They are often required when substantial tooth structure has been lost (e.g. broken teeth, root-filled teeth). The appearance is identical to veneers when viewed in a smile.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="veneer-or-crown">
            <AccordionTrigger>Do I need a porcelain veneer or a crown?</AccordionTrigger>
            <AccordionContent>
              We evaluate each tooth individually and place the restoration most appropriate to each patient's needs. Often in cases involving multiple teeth a combination of porcelain veneers and crowns is placed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="veneer-lifespan">
            <AccordionTrigger>How long do porcelain veneers and crowns last?</AccordionTrigger>
            <AccordionContent>
              With good home care and regular dental visits the lifespan is usually at least 15 years. Porcelain veneers and crowns are stain resistant and do not discolour at all.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="natural-look">
            <AccordionTrigger>Will the porcelain veneers and crowns look natural?</AccordionTrigger>
            <AccordionContent>
              At Dentalini our principal aim is to provide beautiful, natural looking smiles. Our training, experience, and artistic eye ensure all porcelain work looks like real teeth. We ensure your complete satisfaction by allowing your input into the design, shape and colour.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="veneer-visits">
            <AccordionTrigger>How many dental visits are required?</AccordionTrigger>
            <AccordionContent>
              Porcelain veneers and crowns can usually be completed in 2 or 3 visits. A Digital Smile Design (DSD) may be created first. During the first visit teeth are prepared and provisional restorations are placed, so you leave with a beautiful new smile.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="veneer-candidates">
            <AccordionTrigger>Who is a candidate for Porcelain Veneers and Dental Crowns?</AccordionTrigger>
            <AccordionContent>
              Virtually anyone wanting to change their teeth's appearance can benefit. They can correct crooked/misaligned teeth, crowding, chips, wear, spaces, and permanent staining. Not suitable for those with unhealthy teeth/gums, severe malocclusions, or under 18 years of age.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Fillings & Treatments */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Fillings & Treatments</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="fillings">
            <AccordionTrigger>What fillings do you use?</AccordionTrigger>
            <AccordionContent>
              We use tooth-coloured fillings that are safe and durable. They are matched to your tooth colour and are virtually invisible. They are a modern choice to ensure your bright smile and secure your oral health.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tooth-coloured-fillings">
            <AccordionTrigger>Why should I consider tooth-coloured fillings?</AccordionTrigger>
            <AccordionContent>
              Traditional amalgam fillings can be quite visible when you laugh or smile. White fillings are virtually invisible and made of glass particles, synthetic resin and a setting ingredient. With advances in materials, they can be placed on any tooth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="replace-amalgam">
            <AccordionTrigger>Should I replace my silver amalgam fillings with white ones?</AccordionTrigger>
            <AccordionContent>
              It is usually best to change fillings only when an old filling needs replacing. If so, you can ask to have it replaced in a tooth-coloured material.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="root-canal">
            <AccordionTrigger>How do I know if I need Root Canal Treatment?</AccordionTrigger>
            <AccordionContent>
              You will likely require Root Canal Treatment if you have a painful tooth, red or swollen gums, pus in the area of pain, pain when chewing or biting, and notice looseness of the tooth. These are signs of infection in the tooth's pulp that needs immediate treatment.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Gum Disease & Periodontal Care */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Gum Disease & Periodontal Care</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="gum-disease">
            <AccordionTrigger>What is gum disease?</AccordionTrigger>
            <AccordionContent>
              Gum disease is inflammation caused by plaque and tartar buildup which releases toxins into the gum area. It's the biggest cause of tooth loss in adults. Symptoms include red swollen gums, bleeding when brushing, bad breath, tartar buildup, shrinking gums, loose teeth, and pus from gums.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="fix-gum-disease">
            <AccordionTrigger>How can I fix gum disease?</AccordionTrigger>
            <AccordionContent>
              Treatment depends on how advanced the disease is. The most common treatment is professional scaling to remove plaque and calculus from above and below gum margins. Severe cases require multiple cleans and sometimes specialist care with a Periodontist.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="periodontal-treatment">
            <AccordionTrigger>What is Periodontal treatment?</AccordionTrigger>
            <AccordionContent>
              Periodontal treatment is for advanced gum disease. We tailor preventative programs to avoid reaching this stage. If patients show bleeding, pain, deeper gum pockets or abscesses, we deep scale and clean calculus. When condition deteriorates further, surgery may be needed.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Practice Information */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Practice Information</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="sterilization">
            <AccordionTrigger>Do you autoclave all your instruments? What infection control procedures do you take?</AccordionTrigger>
            <AccordionContent>
              Yes, we autoclave all instruments and dispose of single use equipment every time. During autoclaving, steam penetrates enclosed items at extreme temperatures for a set time. We keep constant tracking of sterilization steps to ensure successful sterilization.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="visit-frequency">
            <AccordionTrigger>How often should I have dental visits?</AccordionTrigger>
            <AccordionContent>
              Depending upon your oral health risks, we recommend examinations either once or twice a year. Our aim is for your mouth to be healthy and stable so your teeth last a lifetime with minimum worries, complications, and cost.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="regular-visits">
            <AccordionTrigger>Why should I have regular dental visits?</AccordionTrigger>
            <AccordionContent>
              There's no reason why healthy teeth cannot stay filling free for a lifetime with the correct approach. By having regular examinations, we identify risk factors and take necessary actions early. Decay doesn't happen overnight - early identification saves time, discomfort and cost.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="more-treatment">
            <AccordionTrigger>Why does it feel like that every time I visit a dentist more treatment is required?</AccordionTrigger>
            <AccordionContent>
              As a practice with preventive philosophy, we strive to minimize required treatment. Not all treatment has the same priority. For all proposed treatment we truthfully inform you whether it's urgent, beneficial over the longer term, or completely optional.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="anxious-patients">
            <AccordionTrigger>Do you offer gentle care for anxious patients?</AccordionTrigger>
            <AccordionContent>
              Absolutely. We explain each step, use comfort-first techniques, and create a calm, feminine environment.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="new-patients">
            <AccordionTrigger>Do you accept new patients?</AccordionTrigger>
            <AccordionContent>
              Yes! We welcome new patients and tailor visits to your needs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="payment">
            <AccordionTrigger>What payment options are available?</AccordionTrigger>
            <AccordionContent>
              We accept major cards and offer flexible plans for select treatments.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  </div>
);

export default Faqs;
