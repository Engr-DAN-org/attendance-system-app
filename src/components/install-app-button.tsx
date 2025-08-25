import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

// Extend the Navigator interface to include iOS-specific PWA detection
declare global {
  interface Navigator {
    standalone?: boolean;
  }

  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
      outcome: "accepted" | "dismissed";
      platform: string;
    }>;
  }
}

export default function InstallPromptButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [expandButton, setExpandButton] = useState<boolean>(false);

  useEffect(() => {
    const isInPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    console.log("Is in PWA:", isInPWA);

    if (isVisible != isInPWA) setIsVisible(isInPWA);

    if (!isInPWA) {
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
      };

      window.addEventListener("beforeinstallprompt", handler);

      return () => window.removeEventListener("beforeinstallprompt", handler);
    }
  }, [isVisible]);

  const handleClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  return isVisible ? (
    <Button
      variant="outline"
      onClick={handleClick}
      onMouseEnter={() => setExpandButton(true)}
      onMouseLeave={() => setExpandButton(false)}
      className={cn(
        "transition-all duration-300 group !hover:bg-primary",
        "px-3 pr-4"
      )}
    >
      <Download className="h-5 w-5" />
      <span
        className={cn(
          "ml-2 transition-all duration-300 overflow-hidden whitespace-nowrap",
          expandButton ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
        )}
      >
        Install App
      </span>
    </Button>
  ) : (
    <></>
  );
}
