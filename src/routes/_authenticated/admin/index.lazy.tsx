import Dashboard from "@/components/admin/dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});
