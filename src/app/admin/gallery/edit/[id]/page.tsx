'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import MediaPickerModal from "@/components/admin/MediaPickerModal";

const categories = [
  "Dental Implants",
  "Orthodontics",
  "Caries",
  "Crown & Bridge",
  "Hygiene"
];

export default function EditGalleryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showMediaPicker, setShowMediaPicker] = useState<'before' | 'after' | null>(null);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    beforeImage: "",
    afterImage: "",
    order: 0
  });

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const res = await fetch(`/api/gallery/${params.id}`);
      const data = await res.json();
      if (data.item) {
        setFormData({
          category: data.item.category || "",
          title: data.item.title || "",
          beforeImage: data.item.beforeImage || "",
          afterImage: data.item.afterImage || "",
          order: data.item.order || 0
        });
      }
    } catch (error) {
      console.error("Failed to fetch gallery item:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/gallery/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        router.push("/admin/gallery");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center">
          <div className="text-slate-600">Loading gallery item...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="mb-8">
            <Link href="/admin/gallery">
              <Button variant="ghost" className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-100 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Gallery
              </Button>
            </Link>
            <div className="mb-2">
              <h1 className="text-4xl font-serif font-bold text-slate-900">Edit Gallery Item</h1>
            </div>
            <p className="text-slate-600">Update before/after transformation</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
            <div className="p-8 space-y-8">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold text-slate-700">
                  Category
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-12 text-base border border-slate-300 rounded-md px-3 focus:border-[#0091BA] focus:ring-[#0091BA]/20 focus:outline-none"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold text-slate-700">
                  Title
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Single Implant Treatment"
                  className="h-12 text-base border-slate-300 focus:border-[#0091BA] focus:ring-[#0091BA]/20"
                  required
                />
              </div>

              <div className="border-t border-slate-200"></div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">
                    Before Image
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  
                  {formData.beforeImage ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-slate-200">
                      <img
                        src={formData.beforeImage}
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setFormData({ ...formData, beforeImage: '' })}
                        className="absolute top-2 right-2"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowMediaPicker('before')}
                      className="w-full h-32 border-2 border-dashed border-slate-300 hover:border-[#0091BA] hover:bg-slate-50"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                        <span className="text-sm text-slate-600">Select before image</span>
                      </div>
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">
                    After Image
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  
                  {formData.afterImage ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-slate-200">
                      <img
                        src={formData.afterImage}
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setFormData({ ...formData, afterImage: '' })}
                        className="absolute top-2 right-2"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowMediaPicker('after')}
                      className="w-full h-32 border-2 border-dashed border-slate-300 hover:border-[#0091BA] hover:bg-slate-50"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                        <span className="text-sm text-slate-600">Select after image</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order" className="text-sm font-semibold text-slate-700">
                  Display Order
                </Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="h-12 text-base border-slate-300 focus:border-[#0091BA] focus:ring-[#0091BA]/20"
                />
              </div>
            </div>

            <div className="bg-slate-50 px-8 py-6 border-t border-slate-200 flex items-center justify-between">
              <Link href="/admin/gallery">
                <Button type="button" variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-200">
                  Cancel
                </Button>
              </Link>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-[#0E2F80] to-[#0091BA] hover:from-[#0E2F80]/90 hover:to-[#0091BA]/90 text-white px-8 h-11 font-semibold shadow-lg shadow-[#0091BA]/20" 
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Gallery Item"}
              </Button>
            </div>
          </form>
        </div>
      </main>

      {showMediaPicker && (
        <MediaPickerModal
          isOpen={!!showMediaPicker}
          onClose={() => setShowMediaPicker(null)}
          onSelect={(url) => {
            if (showMediaPicker === 'before') {
              setFormData({ ...formData, beforeImage: url });
            } else {
              setFormData({ ...formData, afterImage: url });
            }
            setShowMediaPicker(null);
          }}
        />
      )}
    </div>
  );
}
