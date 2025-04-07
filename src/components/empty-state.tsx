import { FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No Data",
  message = "There’s nothing to show here yet.",
  icon = <FileQuestion className="w-12 h-12 text-muted-foreground" />,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center gap-2 py-10 text-muted-foreground",
        className
      )}
    >
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{message}</p>
    </div>
  );
}
