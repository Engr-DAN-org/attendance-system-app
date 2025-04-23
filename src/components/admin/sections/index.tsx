import { Main } from "@/components/layout/main";
import { SectionsTable } from "./components/sections-table";
import { sectionsColumn } from "./components/sections-columns";
import { SectionPrimaryButtons } from "./components/section-primary-buttons";
import { useSectionContext } from "./context/section-context";
import { LoadingComponent } from "@/components/general-loader";

export const SectionsListPage = () => {
  const { response, isQueryPending } = useSectionContext();
  console.log("response", response);

  return (
    <>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Course Sections
            </h2>
            <p className="text-muted-foreground">
              Easily organize and manage course sections for your institution.
            </p>
          </div>
          <SectionPrimaryButtons />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {isQueryPending ? (
            <LoadingComponent />
          ) : (
            response &&
            response.data && (
              <SectionsTable columns={sectionsColumn} data={response.data} />
            )
          )}
        </div>
      </Main>
    </>
  );
};
