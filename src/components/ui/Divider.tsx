import { cn } from "@/lib/utils";

export default function Divider({ className }: { className?: string }) {
  return <div className={cn("w-14 h-[3px] rounded-full bg-terra", className)} />;
}
