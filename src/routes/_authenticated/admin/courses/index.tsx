import CourseManager from "@/components/admin/courses";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/courses/")({
  component: CourseManager,
});

// function RouteComponent() {
//   return <div>Hello "/_authenticated/admin/courses/"!</div>
// }
