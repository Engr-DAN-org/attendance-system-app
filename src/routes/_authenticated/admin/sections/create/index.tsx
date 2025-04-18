import { SectionCreationContextProvider } from "@/components/admin/sections/context/create-section-context";
import SectionForm from "@/components/admin/sections/create";
import { Main } from "@/components/layout/main";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/sections/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SectionCreationContextProvider>
      <Main>
        <div className="overflow-auto">
          <div className="mb-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Register Course Section
            </h1>
            <p className="text-muted-foreground">
              Fill out the form below to create and register a new course
              section. Ensure all required fields are completed before
              submission.
            </p>
          </div>
          <Separator />
          <SectionForm />
        </div>
      </Main>
    </SectionCreationContextProvider>
  );
}
