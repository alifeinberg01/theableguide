import { cn } from "@/lib/utils";

type BadgeColor = "navy" | "teal" | "terra" | "sage" | "amber";

interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

const colorMap: Record<BadgeColor, string> = {
  navy:  "bg-charcoal/8 text-charcoal",
  teal:  "bg-dust/15 text-dust-700",
  terra: "bg-terra-100 text-terra-600",
  sage:  "bg-sage-100 text-sage-700",
  amber: "bg-amber-100 text-amber-700",
};

export default function Badge({ color = "navy", children, className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold", colorMap[color], className)}>
      {children}
    </span>
  );
}
