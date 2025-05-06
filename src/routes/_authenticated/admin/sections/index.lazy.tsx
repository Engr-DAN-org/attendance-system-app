import { SectionsListPage } from "@/components/admin/sections";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/admin/sections/")({
  component: SectionsListPage,
});
