'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditFAQPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ question: "", answer: "", category: "", order: 0 });

  useEffect(() => {
    fetchFaq();
  }, []);

  const fetchFaq = async () => {
    const res = await fetch("/api/faqs");
    const data = await res.json();
    const faq = data.faqs.find((f: any) => f._id === params.id);
    if (faq) {
      setFormData({ question: faq.question, answer: faq.answer, category: faq.category, order: faq.order });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/faqs/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        router.push("/admin/faqs");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Link href="/admin/faqs">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to FAQs
            </Button>
          </Link>

          <h1 className="text-3xl font-bold text-black mb-8">Edit FAQ</h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 max-w-3xl">
            <div className="space-y-6">
              <div>
                <Label>Category</Label>
                <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
              </div>

              <div>
                <Label>Question</Label>
                <Input value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} required />
              </div>

              <div>
                <Label>Answer</Label>
                <RichTextEditor 
                  content={formData.answer} 
                  onChange={(value) => setFormData({ ...formData, answer: value })} 
                />
              </div>

              <div>
                <Label>Order</Label>
                <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-[#0091BA] hover:bg-[#0091BA]/90" disabled={loading}>
                  {loading ? "Updating..." : "Update FAQ"}
                </Button>
                <Link href="/admin/faqs">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
