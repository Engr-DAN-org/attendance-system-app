import { SectionPage } from "@/components/admin/sections";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/admin/sections/")({
  component: SectionPage,
});

// function RouteComponent() {
//   return <div>Hello "/_authenticated/admin/sections/"!</div>
// }
