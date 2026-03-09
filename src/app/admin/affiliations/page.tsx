'use client';

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AffiliationsPage() {
  const [affiliations, setAffiliations] = useState<any[]>([]);

  useEffect(() => {
    fetchAffiliations();
  }, []);

  const fetchAffiliations = async () => {
    const res = await fetch("/api/affiliations");
    const data = await res.json();
    setAffiliations(data.affiliations || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this affiliation?")) return;
    await fetch(`/api/affiliations/${id}`, { method: "DELETE" });
    fetchAffiliations();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-black">Affiliations</h1>
            <Link href="/admin/affiliations/add">
              <Button style={{ backgroundColor: '#0091BA' }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Affiliation
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliations.map((affiliation) => (
              <div key={affiliation._id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-center mb-4">
                  <Image
                    src={affiliation.logo}
                    alt={affiliation.name}
                    width={150}
                    height={80}
                    className="max-h-20 w-auto object-contain"
                  />
                </div>
                <h3 className="text-center font-semibold text-gray-800 mb-2">{affiliation.name}</h3>
                {affiliation.url && (
                  <p className="text-center text-sm text-gray-600 mb-4 truncate">{affiliation.url}</p>
                )}
                <div className="flex gap-2 justify-center">
                  <Link href={`/admin/affiliations/edit/${affiliation._id}`}>
                    <Button variant="outline" size="sm">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(affiliation._id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {affiliations.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-600">No affiliations yet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
