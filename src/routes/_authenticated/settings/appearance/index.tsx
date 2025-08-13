import { AppearanceForm } from "@/components/general/appearance/appearance-form";
import ContentSection from "@/components/general/content-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings/appearance/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentSection
      title="Appearance"
      desc="Customize the appearance of the app. Automatically switch between day
          and night themes."
    >
      <AppearanceForm />
    </ContentSection>
  );
}
