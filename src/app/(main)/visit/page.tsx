import SubHeader from "@/components/layout/SubHeader";
import { MapPin, Clock, Car, Train, Bus, Phone, Calendar, Shield, Wifi, Coffee } from "lucide-react";

const Visit = () => {
  const locationFeatures = [
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Conveniently located in the heart of Milsons Point with stunning harbour views"
    },
    {
      icon: Train,
      title: "Public Transport",
      description: "Just 2 minutes walk from Milsons Point Station (North Shore Line)"
    },
    {
      icon: Car,
      title: "Parking Available",
      description: "Street parking and nearby parking stations for your convenience"
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Modern, clean facility with strict hygiene and safety protocols"
    }
  ];

  const amenities = [
    { icon: Wifi, label: "Free WiFi" },
    { icon: Coffee, label: "Refreshments" },
    { icon: Calendar, label: "Flexible Scheduling" },
    { icon: Phone, label: "Emergency Support" }
  ];

  const openingHours = [
    { day: "Monday", hours: "8:00 AM – 6:00 PM", isOpen: true },
    { day: "Tuesday", hours: "8:00 AM – 6:00 PM", isOpen: true },
    { day: "Wednesday", hours: "8:00 AM – 6:00 PM", isOpen: true },
    { day: "Thursday", hours: "Closed", isOpen: false },
    { day: "Friday", hours: "8:00 AM – 6:00 PM", isOpen: true },
    { day: "Saturday", hours: "8:30 AM – 2:00 PM", isOpen: true },
    { day: "Sunday", hours: "Closed", isOpen: false }
  ];

  const transportOptions = [
    {
      type: "Train",
      icon: Train,
      details: ["Milsons Point Station (2 min walk)", "North Shore & Northern Line", "Direct from CBD"]
    },
    {
      type: "Bus",
      icon: Bus,
      details: ["Multiple bus routes", "Stop at Alfred Street", "Frequent services"]
    },
    {
      type: "Car",
      icon: Car,
      details: ["Street parking available", "Nearby parking stations", "Easy harbour bridge access"]
    }
  ];

  return (
    <div>
      <SubHeader
        title="Visit Dentalini"
        description="Find us easily and enjoy a calming, modern space designed around your comfort."
      />

      <section className="container mx-auto py-12 px-4">
    

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 mt-10">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
              
              <div className="h-[400px] md:h-[500px] lg:h-[590px]">
                <iframe
                  title="Dentalini Smile Studio Location"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6627.549355931702!2d151.210381!3d-33.843921!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae8b528fd945%3A0xada31445f0d88f4f!2sShop%203%2F118%20Alfred%20St%20S%2C%20Milsons%20Point%20NSW%202061!5e0!3m2!1sen!2sau!4v1754930748822!5m2!1sen!2sau"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

           
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Opening Hours */}
            <div className="bg-white rounded-xl shadow-lg border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-primary">Opening Hours</h2>
                  <p className="text-muted-foreground">We're here when you need us</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {openingHours.map((schedule, index) => (
                  <div key={index} className={`flex justify-between items-center py-2 px-3 rounded-lg ${
                    schedule.isOpen ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <span className="font-medium text-gray-900">{schedule.day}</span>
                    <span className={`text-sm font-medium ${
                      schedule.isOpen ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-1">Need an appointment outside these hours?</p>
                <p className="text-sm text-blue-700">Call us to discuss emergency appointments or special arrangements.</p>
              </div>
            </div>


          

            {/* Contact for Directions */}
            <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-secondary mb-3">Need Directions?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Having trouble finding us? Our team is happy to provide detailed directions or meet you at the station.
              </p>
              <div className="flex gap-3">
                <button className="flex-1 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors">
                  Call (02) 8920 3000
                </button>
                <button className="flex-1 border border-secondary text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/5 transition-colors">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Visit;
