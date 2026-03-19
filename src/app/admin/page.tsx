'use client';

import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { 
  Briefcase, 
  HelpCircle, 
  Image, 
  Users, 
  Settings,
  FileImage,
  Award,
  Mail,
  SlidersHorizontal,
  Info
} from "lucide-react";

const menuItems = [
  { icon: SlidersHorizontal, label: "Hero Banners", href: "/admin/banners" },
  { icon: Info, label: "Who We Are", href: "/admin/about" },
  { icon: Briefcase, label: "Services", href: "/admin/services" },
  { icon: HelpCircle, label: "FAQs", href: "/admin/faqs" },
  { icon: Image, label: "Gallery", href: "/admin/gallery" },
  { icon: FileImage, label: "Media", href: "/admin/media" },
  { icon: Users, label: "Team", href: "/admin/team" },
  { icon: Award, label: "Affiliations", href: "/admin/affiliations" },
  { icon: Settings, label: "General Info", href: "/admin/general" },
  { icon: Mail, label: "Enquiries", href: "/admin/enquiries" },
];

export default function AdminPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-black mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <item.icon className="w-12 h-12 text-[#0091BA] mb-4" />
                  <h3 className="text-xl font-semibold text-black">{item.label}</h3>
                  <p className="text-gray-600 mt-2">Manage {item.label.toLowerCase()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
