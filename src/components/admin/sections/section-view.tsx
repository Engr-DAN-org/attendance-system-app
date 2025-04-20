import { Main } from "@/components/layout/main";
// import WeeklyCalendar from "./components/weekly-calendar";
import { Separator } from "@/components/ui/separator";

export const SectionManagement = () => {
  return (
    <>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Course Sections
            </h2>
            <p className="text-muted-foreground">
              Manage The Course Sections in your organization here.
            </p>
          </div>
          {/* <UsersPrimaryButtons /> */}
        </div>
        <Separator />
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {/* <WeeklyCalendar /> */}
        </div>
      </Main>
    </>
  );
};
