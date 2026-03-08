'use client';

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const res = await fetch("/api/team");
    const data = await res.json();
    setTeam(data.team || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    fetchTeam();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-black">Team Members</h1>
            <Link href="/admin/team/add">
              <Button className="bg-[#0091BA] hover:bg-[#0091BA]/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="space-y-4">
              {team.map((member) => (
                <div key={member._id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Image src={member.image} alt={member.name} width={60} height={60} className="rounded-full  aspect-square object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-black">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    {member.isPrincipal && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Principal</span>}
                  </div>
                  <Link href={`/admin/team/edit/${member._id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(member._id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
