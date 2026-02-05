'use client';

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function MediaPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-black">Media Library</h1>
            <Button className="bg-[#0091BA] hover:bg-[#0091BA]/90">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600">Media library coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
