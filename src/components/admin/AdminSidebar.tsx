'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Briefcase, 
  HelpCircle, 
  Image, 
  Users, 
  Settings, 
  LogOut,
  FileImage,
  Award,
  Mail,
  SlidersHorizontal,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
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

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0E2F80] text-white flex flex-col h-screen sticky top-0">
      <div className="p-6 flex-1 overflow-auto">
        <img src="/logo-with-bg.png" alt="Logo" className="h-12 mb-8" />
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href 
                  ? "bg-[#0091BA]" 
                  : "hover:bg-[#0091BA]/50"
              }`}>
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-6">
        <Button 
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          variant="outline"
          className="w-full text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
