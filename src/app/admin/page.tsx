'use client';

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
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
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0E2F80] text-white">
        <div className="p-6">
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

        <div className="absolute bottom-6 left-6 right-6">
          <Button 
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            variant="outline"
            className="w-full text-white border-white hover:bg-white hover:text-[#0E2F80]"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-[#0E2F80] mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.slice(1).map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <item.icon className="w-12 h-12 text-[#0091BA] mb-4" />
                  <h3 className="text-xl font-semibold text-[#0E2F80]">{item.label}</h3>
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
