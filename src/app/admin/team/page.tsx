'use client';

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-black">Team Members</h1>
            <Button className="bg-[#0091BA] hover:bg-[#0091BA]/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600">Team management coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
