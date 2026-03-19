'use client';

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function BannersPage() {
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => { fetchBanners(); }, []);

  const fetchBanners = async () => {
    const res = await fetch("/api/banners");
    const data = await res.json();
    setBanners(data.banners || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this banner?")) return;
    await fetch(`/api/banners/${id}`, { method: "DELETE" });
    fetchBanners();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-black">Hero Banners</h1>
            <Link href="/admin/banners/add">
              <Button style={{ backgroundColor: '#0091BA' }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Banner
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div key={banner._id} className="bg-white rounded-xl shadow-md p-6">
                {banner.image && (
                  <div className="flex justify-center mb-4">
                    <img src={banner.image} alt="" className="max-h-32 w-full object-cover rounded-lg" />
                  </div>
                )}
                <h3 className="font-semibold text-gray-800 mb-1">
                  {banner.title} <span className="text-[#0091BA]">{banner.subtitle}</span> {banner.highlight}
                </h3>
                {banner.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{banner.description}</p>
                )}
                <div className="flex items-center justify-between mt-4">
                  <span className={`text-xs px-2 py-1 rounded ${banner.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {banner.published ? 'Published' : 'Draft'}
                  </span>
                  <div className="flex gap-2">
                    <Link href={`/admin/banners/edit/${banner._id}`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(banner._id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {banners.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-600">No banners yet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
