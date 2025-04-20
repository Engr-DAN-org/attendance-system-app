import CourseManager from "@/components/admin/courses";
import { CourseContextProvider } from "@/components/admin/courses/context/course-context";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <CourseContextProvider>
      <CourseManager />
    </CourseContextProvider>
  );
}
