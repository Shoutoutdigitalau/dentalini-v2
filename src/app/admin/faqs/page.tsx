'use client';

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const itemsPerPage = 10;

  useEffect(() => {
    fetchFaqs();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const fetchFaqs = async () => {
    try {
      const res = await fetch("/api/faqs");
      const data = await res.json();
      setFaqs(data.faqs || []);
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this FAQ?")) {
      await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      fetchFaqs();
    }
  };

  const categories = ["All", ...new Set(faqs.map(f => f.category))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || faq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaqs = filteredFaqs.slice(startIndex, endIndex);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-black">FAQs</h1>
            <Link href="/admin/faqs/add">
              <Button className="bg-[#0091BA] hover:bg-[#0091BA]/90">
                <Plus className="w-4 h-4 mr-2" />
                Add FAQ
              </Button>
            </Link>
          </div>

          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search FAQs by question, answer, or category..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 h-12 bg-white border-slate-300"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="h-12 px-4 bg-white border border-slate-300 rounded-md text-sm"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {loading ? (
              <div className="p-6 text-center text-gray-600">Loading...</div>
            ) : faqs.length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                No FAQs found. Click "Add FAQ" to create one.
              </div>
            ) : (
              <>
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Category</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Question</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Answer</th>
                      <th className="text-center px-6 py-4 text-sm font-semibold text-slate-700">Order</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentFaqs.map((faq) => (
                      <tr key={faq._id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm text-slate-900 whitespace-nowrap">{faq.category}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{faq.question}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 max-w-md truncate">{faq.answer}</td>
                        <td className="px-6 py-4 text-center text-sm text-slate-600">{faq.order}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <Link href={`/admin/faqs/edit/${faq._id}`}>
                              <Button size="sm" variant="outline">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(faq._id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredFaqs.length)} of {filteredFaqs.length} FAQs
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            size="sm"
                            variant={currentPage === page ? "default" : "outline"}
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? "bg-[#0091BA]" : ""}
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button size="sm" variant="outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
