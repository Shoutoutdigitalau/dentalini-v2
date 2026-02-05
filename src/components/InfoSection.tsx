import { ReactNode } from "react";

interface InfoSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function InfoSection({ title, children, className }: InfoSectionProps) {
  return (
    <div className={className}>
      <h4 className="font-display font-semibold text-base text-foreground mb-2 tracking-tight">
        {title}
      </h4>
      <div className="text-muted-foreground text-[15px] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
