import { ClassScheduleContextProvider } from "@/components/admin/class-schedule/class-schedule-context";
import { SectionCreationContextProvider } from "@/components/admin/sections/context/create-section-context";
import { SectionContextProvider } from "@/components/admin/sections/context/section-context";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/sections")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SectionContextProvider>
      <SectionCreationContextProvider>
        <ClassScheduleContextProvider>
          <Outlet />
        </ClassScheduleContextProvider>
      </SectionCreationContextProvider>
    </SectionContextProvider>
  );
}
