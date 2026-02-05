'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function AddServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/services", {
        method: "POST",
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

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin/services">
              <Button variant="ghost" className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-100 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </Link>
            <div className="mb-2">
              <h1 className="text-4xl font-serif font-bold text-slate-900">Add New Service</h1>
            </div>
            <p className="text-slate-600">Create a new dental service offering for your practice</p>
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

              {/* Slug */}
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
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                  This will be used in the URL: /services/{formData.slug || 'your-slug'}
                </p>
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
                <p className="text-xs text-slate-500">{formData.description.length} characters</p>
              </div>

              {/* Full Content */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">
                  Full Content
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-semibold text-slate-700">
                  Featured Image URL
                </Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/service-name.jpg"
                  className="h-12 text-base font-mono text-sm border-slate-300 focus:border-[#0091BA] focus:ring-[#0091BA]/20"
                />
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                  Optional: Add a path to an image in your public folder
                </p>
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
                {loading ? "Creating Service..." : "Create Service"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
