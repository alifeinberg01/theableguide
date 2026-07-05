import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  color?: "terra" | "teal" | "sage" | "navy";
}

const colorMap = {
  terra: "text-terra",
  teal:  "text-dust",
  sage:  "text-sage-700",
  navy:  "text-charcoal",
};

export default function SectionLabel({ children, className, color = "terra" }: SectionLabelProps) {
  return (
    <p className={cn("label-tag", colorMap[color], className)}>
      <span className="w-4 h-px bg-current inline-block" />
      {children}
      <span className="w-4 h-px bg-current inline-block" />
    </p>
  );
}
