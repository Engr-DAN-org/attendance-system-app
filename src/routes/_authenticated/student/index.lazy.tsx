import StudentDashboard from "@/components/student/dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/student/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <StudentDashboard />
    </>
  );
}
