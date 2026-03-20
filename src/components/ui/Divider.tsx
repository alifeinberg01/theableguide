import { cn } from "@/lib/utils";

export default function Divider({ className }: { className?: string }) {
  return <div className={cn("w-16 h-1 rounded-full bg-terra", className)} />;
}
