'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import MediaPickerModal from "@/components/admin/MediaPickerModal";

export default function AddBannerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    highlight: "",
    description: "",
    buttonText: "Book Appointment",
    image: "",
    order: 0,
    published: true
  });
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    if (res.ok) router.push("/admin/banners");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className=" mx-auto">
          <Link href="/admin/banners">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-black mb-8">Add Banner</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  placeholder="e.g. Experience and Quality"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  placeholder="e.g. Treatment You can"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Highlight Text</label>
                <Input
                  value={formData.highlight}
                  onChange={(e) => setFormData({...formData, highlight: e.target.value})}
                  placeholder="e.g. Trust."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <Input
                  value={formData.buttonText}
                  onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image *</label>
                <div className="flex gap-4 items-start">
                  <Button type="button" variant="outline" onClick={() => setShowMediaPicker(true)}>
                    Select Image
                  </Button>
                  {formData.image && (
                    <img src={formData.image} alt="" className="max-h-20 w-auto object-contain rounded" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  id="published"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">Published</label>
              </div>

              <Button type="submit" style={{ backgroundColor: '#0091BA' }} className="w-full">
                Add Banner
              </Button>
            </form>
          </div>
        </div>
      </main>

      {showMediaPicker && (
        <MediaPickerModal
          isOpen={showMediaPicker}
          onSelect={(url) => {
            setFormData({...formData, image: url});
            setShowMediaPicker(false);
          }}
          onClose={() => setShowMediaPicker(false)}
        />
      )}
    </div>
  );
}
