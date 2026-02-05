interface ConditionItemProps {
  number: number;
  children: React.ReactNode;
}

export default function ConditionItem({ number, children }: ConditionItemProps) {
  return (
    <div className="flex gap-3 md:gap-4 items-start group">
      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-lg bg-secondary/10 text-secondary font-display font-semibold text-xs md:text-sm transition-all duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground">
        {number}
      </span>
      <p className="text-muted-foreground text-sm md:text-[15px] leading-relaxed pt-0.5">
        {children}
      </p>
    </div>
  );
}
