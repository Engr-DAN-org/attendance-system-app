// import Dashboard from "@/components/admin/dashboard";
import ComingSoon from "@/components/coming-soon";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/admin/")({
  // component: Dashboard,
  component: ComingSoon,
});
