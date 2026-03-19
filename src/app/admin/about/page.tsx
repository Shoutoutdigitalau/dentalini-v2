'use client';

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon } from "lucide-react";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function AboutPage() {
  const [formData, setFormData] = useState({
    heading: 'Who We Are',
    description: '',
    image: '/thumbnail_teeth2.jpg',
    buttonText: 'Learn More',
    buttonLink: '#',
    yearsLabel: 'Years of Well-Established Practice',
    startYear: 2013
  });
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/about");
      const data = await res.json();
      if (data.about) setFormData(data.about);
      setFetching(false);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    setLoading(false);
    alert("Saved!");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-black mb-8">Who We Are Section</h1>

            {fetching ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0091BA]"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
                  <Input
                    value={formData.heading}
                    onChange={(e) => setFormData({...formData, heading: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  {formData.image ? (
                    <div className="relative w-full max-w-xs h-48 rounded-lg overflow-hidden border-2 border-slate-200">
                      <img src={formData.image} alt="" className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button type="button" variant="secondary" size="sm" onClick={() => setShowMediaPicker(true)}>
                          Change
                        </Button>
                        <Button type="button" variant="destructive" size="sm" onClick={() => setFormData({...formData, image: ''})}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowMediaPicker(true)}
                      className="w-full max-w-xs h-32 border-2 border-dashed border-slate-300 hover:border-[#0091BA] hover:bg-slate-50"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                        <span className="text-sm text-slate-600">Select image</span>
                      </div>
                    </Button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                  <Input
                    value={formData.buttonText}
                    onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                  <Input
                    value={formData.buttonLink}
                    onChange={(e) => setFormData({...formData, buttonLink: e.target.value})}
                    placeholder="/about"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Year (for years counter)</label>
                  <Input
                    type="number"
                    value={formData.startYear}
                    onChange={(e) => setFormData({...formData, startYear: parseInt(e.target.value) || 2013})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years Label</label>
                  <Input
                    value={formData.yearsLabel}
                    onChange={(e) => setFormData({...formData, yearsLabel: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <RichTextEditor
                    content={formData.description}
                    onChange={(html) => setFormData({...formData, description: html})}
                  />
                </div>

                <Button type="submit" style={{ backgroundColor: '#0091BA' }} className="w-full" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            )}
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
