import { cn } from "@/lib/utils";

type BadgeColor = "navy" | "teal" | "terra" | "sage" | "amber";

interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

const colorMap: Record<BadgeColor, string> = {
  navy:  "bg-navy/10 text-navy",
  teal:  "bg-teal/10 text-teal-700",
  terra: "bg-terra/10 text-terra-700",
  sage:  "bg-sage/10 text-sage-700",
  amber: "bg-amber/10 text-amber-700",
};

export default function Badge({ color = "navy", children, className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold", colorMap[color], className)}>
      {children}
    </span>
  );
}
