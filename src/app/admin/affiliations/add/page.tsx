'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import Image from "next/image";

export default function AddAffiliationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    url: "",
    order: 0
  });
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/affiliations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    if (res.ok) router.push("/admin/affiliations");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/admin/affiliations">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-black mb-8">Add Affiliation</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo *</label>
                <div className="flex gap-4 items-start">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowMediaPicker(true)}
                  >
                    Select Logo
                  </Button>
                  {formData.logo && (
                    <Image src={formData.logo} alt="Logo" width={100} height={100} className="max-h-20 w-auto object-contain" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                <Input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                />
              </div>

              <Button type="submit" style={{ backgroundColor: '#0091BA' }} className="w-full">
                Add Affiliation
              </Button>
            </form>
          </div>
        </div>
      </main>

      {showMediaPicker && (
        <MediaPickerModal
          isOpen={showMediaPicker}
          onSelect={(url) => {
            setFormData({...formData, logo: url});
            setShowMediaPicker(false);
          }}
          onClose={() => setShowMediaPicker(false)}
        />
      )}
    </div>
  );
}
