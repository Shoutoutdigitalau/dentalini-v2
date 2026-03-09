import SubHeader from "@/components/layout/SubHeader";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import dbConnect from "@/lib/mongodb";
import Team from "@/models/Team";

export const revalidate = 60; // Revalidate every 60 seconds

async function getTeam() {
  await dbConnect();
  const team = await Team.find({}).sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(team));
}

export default async function TeamPage() {
  const team = await getTeam();
  const principal = team.find((m: any) => m.isPrincipal);
  const staff = team.filter((m: any) => !m.isPrincipal);

  return (
    <div>
      <SubHeader
        title="Meet Our Team"
        description="Meet the specialists who make your dental experience truly exceptional."
      />
      <section className="container mx-auto py-8 md:py-12 px-4">
        {principal && (
          <Card className="mb-8 md:mb-16 overflow-hidden border-none">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px]">
                  <Image
                    src={principal.image}
                    alt={principal.name}
                    width={350}
                    height={350}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
              </div>
              <CardContent className="flex flex-col justify-center p-4 lg:p-6">
                <h2 className="text-xl md:text-2xl font-semibold text-primary mb-2 text-center lg:text-left">{principal.name}</h2>
                <p className="text-sm md:text-base text-primary font-medium mb-4 text-center lg:text-left">{principal.role}</p>
                <div 
                  className="text-sm md:text-base text-muted-foreground leading-relaxed text-center lg:text-left prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: principal.description }}
                />
              </CardContent>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {staff.map((member: any) => (
            <Card key={member._id} className="overflow-hidden shadow-md">
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
                  <div 
                    className="text-xs md:text-sm text-muted-foreground leading-relaxed text-center prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: member.description }}
                  />
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
