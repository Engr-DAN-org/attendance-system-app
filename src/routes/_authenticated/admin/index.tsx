import { useRouter } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { navigate } = useRouter();
  useEffect(() => {
    navigate({ to: "/admin/users" });
  }, [navigate]);
  return <div></div>;
}
