import ComingSoon from "@/components/coming-soon";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/student/")({
  component: ComingSoon,
});

// function RouteComponent() {
//   return <div>Hello "/_authenticated/student/"!</div>
// }
