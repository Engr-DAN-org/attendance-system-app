import { SectionCreationContextProvider } from "@/components/admin/sections/context/create-section-context";
import SectionForm from "@/components/admin/sections/create";
import { Main } from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IconDatabase } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/sections/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SectionCreationContextProvider>
      <Main>
        <div className="overflow-auto">
          <div className="flex justify-between items-center">
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
            <Button type="submit" form="section-form">
              <IconDatabase /> Save Section
            </Button>
          </div>
          <Separator />
          <SectionForm />
        </div>
      </Main>
    </SectionCreationContextProvider>
  );
}
