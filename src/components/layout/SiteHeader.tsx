'use client';

import { Button } from "@/components/ui/button";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/team", label: "Meet the Team" },
  { to: "/faqs", label: "FAQ's" },
  { to: "/payment-plans", label: "Payment Plans" },
  { to: "/visit", label: "Visit Dentalini" },
  { to: "/contact", label: "Contact Us" },
  { to: "/gallery", label: "Gallery" },
];

const SOCIAL_LINKS = [
  { to: "https://www.facebook.com/dentalini", icon: Facebook },
  { to: "https://www.instagram.com/dentalini", icon: Instagram },
  { to: "https://www.linkedin.com/company/dentalini", icon: Linkedin },
];

const SiteHeader = () => {
  const scrollDirection = useScrollDirection();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top blue section - always static, scrolls normally */}
      <div className="bg-[#0E2F80] py-1">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-1 px-4 gap-2 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-white text-center sm:text-left">
            <div className="flex items-center gap-1 sm:gap-2">
              <Phone className="text-white w-3 h-3 sm:w-4 sm:h-4" />
              <div className="text-[9px] sm:text-[11px]">
                <p>02 8920 3000</p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <MapPin className="text-white w-3 h-3 sm:w-4 sm:h-4" />
              <div className="text-[9px] sm:text-[11px] text-center sm:text-left">
                <p>Suite 3, 118 Alfred St South, Milsons Point NSW 2061</p>
              </div>
            </div>
          </div>

          <div className="md:flex items-center gap-2 sm:gap-3 hidden ">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.to}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 flex justify-center items-center rounded-full transition-colors"
              >
                <link.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation section - this will be fixed on scroll up with animation */}
      <header 
        className={`w-full bg-[#FFFFFF] transition-all duration-700 ease-in-out transform ${
          scrollDirection === 'up' 
            ? 'fixed top-0 left-0 right-0 z-50 translate-y-0 opacity-100 shadow-sm' 
            : 'relative translate-y-0 opacity-100'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:py-0 lg:h-16">
          <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <img className="h-8 sm:h-10 lg:h-12" src="/logo.png" alt="Dentalini Logo" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                className={`text-sm xl:text-base transition-colors whitespace-nowrap ${
                  pathname === link.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="hidden lg:block">
            <Button variant="hero" size="lg" className="hover-scale whitespace-nowrap">
              Book Appointment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

      
      </header>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <>
        
            
            {/* Drawer */}
            <div className="fixed inset-0 h-screen w-full bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
              <div className="flex items-center justify-between p-4 border-b">
                <img className="h-8" src="/logo.png" alt="Dentalini Logo" />
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex flex-col p-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    href={link.to}
                    onClick={closeMobileMenu}
                    className={`py-3 px-2 text-base border-b border-gray-100 transition-colors ${
                      pathname === link.to
                        ? "text-primary font-medium"
                        : "text-gray-700 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="mt-6">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    onClick={closeMobileMenu}
                  >
                    Book Appointment
                  </Button>
                </div>

                {/* Social Links in Mobile Menu */}
                <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-100">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.to}
                      href={link.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </>
        )}
    </>
  );
};

export default SiteHeader;
