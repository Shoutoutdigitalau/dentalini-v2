'use client';

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function GeneralPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-black mb-8">General Information</h1>
          
          <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone</Label>
                  <Input placeholder="02 8920 3000" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input placeholder="info@dentalini.com" />
                </div>
              </div>
            </div>

            <div>
              <Label>Address</Label>
              <Textarea placeholder="Suite 3, 118 Alfred St South, Milsons Point NSW 2061" />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
              <div className="space-y-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <div key={day} className="grid grid-cols-3 gap-4">
                    <Label className="self-center">{day}</Label>
                    <Input placeholder="9:00 AM" />
                    <Input placeholder="5:00 PM" />
                  </div>
                ))}
              </div>
            </div>

            <Button className="bg-[#0091BA] hover:bg-[#0091BA]/90">Save Changes</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
