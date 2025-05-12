import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import { IconArrowLeft } from "@tabler/icons-react";

interface TopNavProps {
  className?: string;
}

export function TopNav({ className, ...props }: TopNavProps) {
  const { history, navigate } = useRouter();

  const handleGoBack = () =>
    history.canGoBack() ? history.go(-1) : navigate({ to: "/" });

  return (
    <>
      <div className="md:hidden">
        <Button size="icon" variant="outline" onClick={handleGoBack}>
          <IconArrowLeft />
        </Button>
      </div>

      <div
        className={cn(
          "hidden items-center space-x-4 md:flex lg:space-x-6",
          className
        )}
        {...props}
      >
        <Button
          onClick={handleGoBack}
          disabled={!history.canGoBack()}
          variant="link"
          size="sm"
          className="text-muted-foreground"
        >
          <IconArrowLeft /> Prev
        </Button>
      </div>
    </>
  );
}
