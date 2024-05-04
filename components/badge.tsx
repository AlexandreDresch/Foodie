import { ArrowDownIcon } from "lucide-react";

interface BadgeProps {
  percentage: number;
  className?: string;
}

export default function Badge({ percentage, className }: BadgeProps) {
  return (
    <div
      className={`${className} flex items-center gap-0.5 rounded-full bg-primary px-2 py-0.5 text-white`}
    >
      <ArrowDownIcon size={12} />
      <span className="text-xs font-semibold">{percentage}%</span>
    </div>
  );
}
