'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";
import MediaPickerModal from "@/components/admin/MediaPickerModal";

export default function EditServicePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [content, setContent] = useState('');
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'feature' | 'editor'>('feature');
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: ""
  });

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/services/${params.id}`);
      const data = await res.json();
      if (data.service) {
        setFormData({
          title: data.service.title || "",
          slug: data.service.slug || "",
          description: data.service.description || "",
          image: data.service.image || "",
          metaTitle: data.service.metaTitle || "",
          metaDescription: data.service.metaDescription || "",
          metaKeywords: data.service.metaKeywords || ""
        });
        setContent(data.service.content || "");
      }
    } catch (error) {
      console.error("Failed to fetch service:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/services/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, content })
      });

      if (res.ok) {
        router.push("/admin/services");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  if (fetching) {
    return (
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center">
          <div className="text-slate-600">Loading service...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin/services">
              <Button variant="ghost" className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-100 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </Link>
            <div className="mb-2">
              <h1 className="text-4xl font-serif font-bold text-slate-900">Edit Service</h1>
            </div>
            <p className="text-slate-600">Update your dental service offering</p>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
            <div className="p-8 space-y-8">
              {/* Service Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold text-slate-700">
                  Service Title
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      title: e.target.value,
                      slug: generateSlug(e.target.value)
                    });
                  }}
                  placeholder="e.g., Dental Implants"
                  className="h-12 text-base border-slate-300 focus:border-[#0091BA] focus:ring-[#0091BA]/20"
                  required
                />
              </div>

              {/* URL Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-sm font-semibold text-slate-700">
                  URL Slug
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="dental-implants"
                  className="h-12 text-base font-mono text-sm border-slate-300 focus:border-[#0091BA] focus:ring-[#0091BA]/20"
                  required
                />
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200"></div>

              {/* Short Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
                  Short Description
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="A brief overview of the service (shown in service cards)"
                  className="text-base border-slate-300 focus:border-[#0091BA] focus:ring-[#0091BA]/20 resize-none"
                  required
                />
              </div>

              {/* Full Content */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">
                  Full Content
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <RichTextEditor 
                  content={content} 
                  onChange={setContent}
                  onImageClick={() => {
                    setMediaPickerTarget('editor');
                    setShowMediaPicker(true);
                  }}
                />
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200"></div>

              {/* SEO Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">SEO Information</h3>
                
                {/* Meta Title */}
                <div className="space-y-2">
                  <Label htmlFor="metaTitle" className="text-sm font-semibold text-slate-700">
                    Meta Title
                  </Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    placeholder="SEO title for search engines"
                    className="h-12 text-base border-slate-300 focus:border-[#0091BA] focus:ring-[#0091BA]/20"
                  />
                </div>

                {/* Meta Description */}
                <div className="space-y-2">
                  <Label htmlFor="metaDescription" className="text-sm font-semibold text-slate-700">
                    Meta Description
                  </Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value.slice(0, 160) })}
                    rows={2}
                    maxLength={160}
                    placeholder="Brief description for search results (max 160 characters)"
                    className="text-base border-slate-300 focus:border-[#0091BA] focus:ring-[#0091BA]/20 resize-none"
                  />
                  <p className="text-xs text-slate-500 text-right">
                    {formData.metaDescription.length}/160 characters
                  </p>
                </div>

                {/* Meta Keywords */}
                <div className="space-y-2">
                  <Label htmlFor="metaKeywords" className="text-sm font-semibold text-slate-700">
                    Meta Keywords
                  </Label>
                  <Input
                    id="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                    placeholder="keyword1, keyword2, keyword3"
                    className="h-12 text-base border-slate-300 focus:border-[#0091BA] focus:ring-[#0091BA]/20"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-semibold text-slate-700">
                  Featured Image
                </Label>
                
                {formData.image ? (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-slate-200">
                    <img
                      src={formData.image}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="absolute top-2 right-2"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setMediaPickerTarget('feature');
                      setShowMediaPicker(true);
                    }}
                    className="w-full h-32 border-2 border-dashed border-slate-300 hover:border-[#0091BA] hover:bg-slate-50"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="w-8 h-8 text-slate-400" />
                      <span className="text-sm text-slate-600">Click to select image</span>
                    </div>
                  </Button>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="bg-slate-50 px-8 py-6 border-t border-slate-200 flex items-center justify-between">
              <Link href="/admin/services">
                <Button type="button" variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-200">
                  Cancel
                </Button>
              </Link>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-[#0E2F80] to-[#0091BA] hover:from-[#0E2F80]/90 hover:to-[#0091BA]/90 text-white px-8 h-11 font-semibold shadow-lg shadow-[#0091BA]/20" 
                disabled={loading}
              >
                {loading ? "Updating Service..." : "Update Service"}
              </Button>
            </div>
              
          </form>
        </div>
      </main>

      <MediaPickerModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(url) => {
          if (mediaPickerTarget === 'feature') {
            setFormData({ ...formData, image: url });
          } else if (mediaPickerTarget === 'editor') {
            if ((window as any).__editorInsertImage) {
              (window as any).__editorInsertImage(url);
            }
          }
        }}
      />
    </div>
  );
}
