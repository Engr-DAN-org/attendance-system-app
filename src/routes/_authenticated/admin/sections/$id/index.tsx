import { SectionManagement } from "@/components/admin/sections/section-view";
import NotFoundError from "@/features/errors/not-found-error";
import { getByIdAsync } from "@/services/section.service";
import { createFileRoute, ErrorComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/sections/$id/")({
  notFoundComponent: NotFoundError,
  errorComponent: ErrorComponent,
  component: RouteComponent,
  loader: async ({ params }) => {
    const id = Number(params.id);
    if (isNaN(id) || id <= 0) {
      throw new Error("Invalid id parameter");
    }
    return await getByIdAsync(id.toString());
  },
  params: {
    parse: (params) => {
      const id = Number(params.id);
      if (!isNaN(id) && id > 0) {
        return { id: params.id };
      }
      throw new Error("Invalid id parameter");
    },
    stringify: (params) => ({ id: params.id }),
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return <SectionManagement data={data} />;
}
