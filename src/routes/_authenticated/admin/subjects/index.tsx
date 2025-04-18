import { SubjectsPage } from "@/components/admin/subjects";
import { SubjectContextProvider } from "@/components/admin/subjects/context/subject-context";
import { Main } from "@/components/layout/main";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/subjects/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SubjectContextProvider>
      <Main>
        <SubjectsPage />
      </Main>
    </SubjectContextProvider>
  );
}
