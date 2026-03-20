import { Users, BookOpen, Star, Globe } from "lucide-react";

const stats = [
  { icon: Users,    value: "10,000+", label: "Families Helped" },
  { icon: BookOpen, value: "6+",      label: "Expert Guides" },
  { icon: Star,     value: "4.9★",    label: "Average Rating" },
  { icon: Globe,    value: "50+",     label: "Destinations Covered" },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-navy/8 py-6">
      <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-navy/10">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-center px-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-terra" />
                <span className="font-display font-bold text-2xl text-navy">{value}</span>
              </div>
              <span className="text-sm text-charcoal-muted font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
