'use client';

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function GeneralPage() {
  const { toast } = useToast();
  const [openingHours, setOpeningHours] = useState([
    { day: "Monday", hours: "8:00 AM – 6:00 PM", isOpen: true },
    { day: "Tuesday", hours: "8:00 AM – 6:00 PM", isOpen: true },
    { day: "Wednesday", hours: "8:00 AM – 6:00 PM", isOpen: true },
    { day: "Thursday", hours: "By Appointments Only", isOpen: true },
    { day: "Friday", hours: "8:00 AM – 6:00 PM", isOpen: true },
    { day: "Saturday", hours: "8:30 AM – 2:00 PM", isOpen: true },
    { day: "Sunday", hours: "Closed", isOpen: false }
  ]);
  const [contactInfo, setContactInfo] = useState({
    phone: "(02) 8920 3000",
    email: "info@dentalini.com.au",
    address: "Suite 3, 118 Alfred St South, Milsons Point NSW 2061",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6627.549355931702!2d151.210381!3d-33.843921!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae8b528fd945%3A0xada31445f0d88f4f!2sShop%203%2F118%20Alfred%20St%20S%2C%20Milsons%20Point%20NSW%202061!5e0!3m2!1sen!2sau!4v1754930748822!5m2!1sen!2sau"
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setFetching(true);
    const res = await fetch("/api/settings");
    const data = await res.json();
    if (data.settings?.openingHours) {
      setOpeningHours(data.settings.openingHours);
    }
    if (data.settings?.contactInfo) {
      setContactInfo({
        phone: data.settings.contactInfo.phone || "(02) 8920 3000",
        email: data.settings.contactInfo.email || "info@dentalini.com.au",
        address: data.settings.contactInfo.address || "Suite 3, 118 Alfred St South, Milsons Point NSW 2061",
        mapUrl: data.settings.contactInfo.mapUrl || "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6627.549355931702!2d151.210381!3d-33.843921!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae8b528fd945%3A0xada31445f0d88f4f!2sShop%203%2F118%20Alfred%20St%20S%2C%20Milsons%20Point%20NSW%202061!5e0!3m2!1sen!2sau!4v1754930748822!5m2!1sen!2sau"
      });
    }
    setFetching(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ openingHours, contactInfo })
      });
      
      if (res.ok) {
        toast({
          title: "Settings saved!",
          description: "Your changes have been saved successfully.",
        });
        // Don't refetch - keep current state
      } else {
        toast({
          title: "Error",
          description: "Failed to save settings.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const updateHour = (index: number, field: string, value: any) => {
    const updated = [...openingHours];
    updated[index] = { ...updated[index], [field]: value };
    setOpeningHours(updated);
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-black mb-8">General Information</h1>
          
          {fetching ? (
            <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0091BA] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading settings...</p>
              </div>
            </div>
          ) : (
          <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone</Label>
                  <Input 
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    placeholder="(02) 8920 3000" 
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input 
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    placeholder="info@dentalini.com.au" 
                  />
                </div>
              </div>
            </div>

            <div>
              <Label>Address</Label>
              <Textarea 
                value={contactInfo.address}
                onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                placeholder="Suite 3, 118 Alfred St South, Milsons Point NSW 2061" 
              />
            </div>

            <div>
              <Label>Google Maps Embed URL</Label>
              <Textarea 
                value={contactInfo.mapUrl}
                onChange={(e) => setContactInfo({...contactInfo, mapUrl: e.target.value})}
                placeholder="https://www.google.com/maps/embed?pb=..." 
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">Get embed URL from Google Maps → Share → Embed a map</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
              <div className="space-y-3">
                {openingHours.map((item, index) => (
                  <div key={item.day} className="grid grid-cols-3 gap-4 items-center">
                    <Label className="self-center">{item.day}</Label>
                    <Input 
                      value={item.hours}
                      onChange={(e) => updateHour(index, "hours", e.target.value)}
                      placeholder="8:00 AM – 6:00 PM"
                    />
                    <select 
                      className="border rounded px-3 py-2"
                      value={item.isOpen ? "open" : "closed"}
                      onChange={(e) => updateHour(index, "isOpen", e.target.value === "open")}
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleSave} 
              disabled={loading}
              className="bg-[#0091BA] hover:bg-[#0091BA]/90"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
          )}
        </div>
      </main>
    </div>
  );
}
