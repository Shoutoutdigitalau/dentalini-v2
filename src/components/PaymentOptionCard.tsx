import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PaymentOptionCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
  featured?: boolean;
  delay?: number;
}

export default function PaymentOptionCard({ 
  icon, 
  title, 
  children, 
  className,
  featured = false,
  delay = 0
}: PaymentOptionCardProps) {
  return (
    <div 
      className={cn(
        "group relative rounded-xl md:rounded-2xl bg-card p-4 md:p-8 lg:p-10 shadow-elegant hover:shadow-elegant-lg transition-all",
        featured && "ring-1 ring-secondary/20",
        className
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-secondary/5 to-transparent " />
      
      <div className="relative">
        {/* Icon and title */}
        <div className="flex items-start gap-3 md:gap-5 mb-6 md:mb-8">
          <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 text-secondary transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow">
            {icon}
          </div>
          <div className="pt-1 md:pt-2">
            <h3 className="font-display text-lg md:text-xl lg:text-2xl font-semibold text-foreground tracking-tight">
              {title}
            </h3>
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-4 md:space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
