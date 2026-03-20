import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({ children, className, hover = false, padding = "md" }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-card",
        hover && "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
        paddingMap[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
