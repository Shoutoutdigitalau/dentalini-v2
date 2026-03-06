'use client';

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  createdAt: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data.services || []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setServices(services.filter((s) => s._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentFeatured })
      });

      if (res.ok) {
        setServices(services.map(s => 
          s._id === id ? { ...s, featured: !currentFeatured } : s
        ));
      }
    } catch (error) {
      console.error("Failed to update featured status:", error);
    }
  };

  // Pagination and search
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentServices = filteredServices.slice(startIndex, endIndex);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-black">Services</h1>
            <Link href="/admin/services/add">
              <Button className="bg-[#0091BA] hover:bg-[#0091BA]/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </Link>
          </div>

          {/* Search Box */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search services by title, slug, or description..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 h-12 bg-white border-slate-300"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {loading ? (
              <div className="p-6 text-center text-gray-600">Loading...</div>
            ) : services.length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                No services found. Click "Add Service" to create one.
              </div>
            ) : (
              <>
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Image</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Title</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Slug</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Description</th>
                      <th className="text-center px-6 py-4 text-sm font-semibold text-slate-700">Featured</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentServices.map((service) => (
                      <tr key={service._id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4">
                          {service.image ? (
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-slate-200 rounded flex items-center justify-center text-slate-400 text-xs">
                              No image
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900">{service.title}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 font-mono">{service.slug}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 max-w-md truncate">
                          {service.description}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleToggleFeatured(service._id, service.featured || false)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              service.featured ? 'bg-[#0091BA]' : 'bg-slate-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                service.featured ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <Link href={`/admin/services/edit/${service._id}`}>
                              <Button size="sm" variant="outline">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(service._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredServices.length)} of {filteredServices.length} services
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
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

