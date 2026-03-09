'use client';

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setItems(data.items || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery item?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    fetchGallery();
  };

  const groupedByCategory = items.reduce((acc: any, item: any) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-black">Gallery</h1>
            <Link href="/admin/gallery/add">
              <Button className="bg-[#0091BA] hover:bg-[#0091BA]/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Gallery Item
              </Button>
            </Link>
          </div>
          
          <div className="space-y-6">
            {Object.entries(groupedByCategory).map(([category, categoryItems]: [string, any]) => (
              <div key={category} className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-black mb-4 capitalize">{category}</h2>
                <div className="space-y-4">
                  {categoryItems.map((item: any) => (
                    <div key={item._id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex gap-2">
                        <Image src={item.beforeImage} alt="Before" width={80} height={80} className="rounded object-cover" />
                        <Image src={item.afterImage} alt="After" width={80} height={80} className="rounded object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-black">{item.title}</h3>
                        <p className="text-sm text-gray-600">Order: {item.order}</p>
                      </div>
                      <Link href={`/admin/gallery/edit/${item._id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(item._id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
