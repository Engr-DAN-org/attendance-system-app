import { SectionsListPage } from "@/components/admin/sections";
import { SectionContextProvider } from "@/components/admin/sections/context/section-context";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/admin/sections/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SectionContextProvider>
      <SectionsListPage />
    </SectionContextProvider>
  );
}
