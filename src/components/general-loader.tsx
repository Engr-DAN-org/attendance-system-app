import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
  className?: string;
}

export function LoadingComponent({
  fullScreen = true,
  message = "Loading...",
  className,
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 text-muted-foreground w-full  min-h-64",
        fullScreen ? "h-screen" : "h-full",
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
