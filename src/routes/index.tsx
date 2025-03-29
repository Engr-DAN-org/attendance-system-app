import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    console.log("cookies:", document.cookie);
  }, []);
  return <div>Hello "/"!</div>;
}
