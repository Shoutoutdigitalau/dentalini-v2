'use client';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import SubHeader from "@/components/layout/SubHeader";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["(02) 8920 3000", "Emergency: (02) 8920 3000"],
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@dentalini.com.au"],
      action: "Send Email"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["Suite 3, 118 Alfred St South", "Milsons Point NSW 2061"],
      action: "Get Directions"
    },
    {
      icon: Clock,
      title: "Opening Hours",
      details: ["8am - 6pm : Monday - Wednesday, Friday", "8.30am - 2pm : Saturday", "Thursday : By appointments only", "Closed : Sunday, Public holiday"],
      action: "Book Appointment"
    }
  ];

  return (
    <div>
      <SubHeader
        title="Contact Dentalini"
        description="Ready to transform your smile? Get in touch with our friendly team today."
      />
      
      {/* Contact Info Cards */}
      <section className="container mx-auto py-12 px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl mb-4">
                <info.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-3">{info.title}</h3>
              <div className="space-y-1 mb-4">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground">{detail}</p>
                ))}
              </div>
             
            </div>
          ))}
        </div>

        {/* Main Contact Section */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-lg border p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-primary">Send us a Message</h2>
                </div>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <Input placeholder="John" required className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <Input placeholder="Smith" required className="h-12" />
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <Input type="email" placeholder="john@example.com" required className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <Input type="tel" placeholder="(02) 1234 5678" className="h-12" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <Input placeholder="Appointment Inquiry" className="h-12" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <Textarea 
                    placeholder="Tell us about your dental needs or any questions you have..." 
                    required 
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>For urgent dental emergencies,</strong> please call us directly at (02) 8920 3000
                  </p>
                  <p className="text-xs text-muted-foreground">
                    By submitting this form, you agree to our privacy policy and consent to being contacted by our team.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  disabled={loading}
                  className="w-full h-12"
                >
                  {loading ? "Sending Message..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>

          {/* Map and Additional Info */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
             
              <div className="h-[400px] md:h-[500px] lg:h-[780px]">
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
        </div>
      </section>
    </div>
  );
};

export default Contact;
