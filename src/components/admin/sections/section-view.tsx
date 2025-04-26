import { Main } from "@/components/layout/main";
// import WeeklyCalendar from "./components/weekly-calendar";
import { Separator } from "@/components/ui/separator";
import { Section } from "@/interfaces/types/section";
import WeeklyCalendar from "./components/weekly-calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentsTable } from "./components/students-table";
import { UserForm } from "@/interfaces/types/user";

export const SectionManagement = ({ data }: { data: Section }) => {
  return (
    <>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {data.course?.code} {data.yearLevel} - {data.name}
            </h2>
            <p className="text-muted-foreground">
              View and manage details for this class section.
            </p>
          </div>
          {/* <UsersPrimaryButtons /> */}
        </div>
        <Separator />
        <Tabs defaultValue="schedules" className="w-full mt-2">
          <TabsList className="justify-start">
            <TabsTrigger value="schedules" className="">
              Weekly Schedule
            </TabsTrigger>
            <TabsTrigger value="students" className="">
              Students
            </TabsTrigger>
          </TabsList>
          <div className="my-2" />
          <TabsContent
            value="students"
            className="flex-1 overflow-auto px-4 py-1"
          >
            <StudentsTable data={data.students as UserForm[]} />
          </TabsContent>
          <TabsContent
            asChild
            value="schedules"
            className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0"
          >
            <WeeklyCalendar data={data.classSchedules} />
          </TabsContent>
        </Tabs>
        <div className=""></div>
      </Main>
    </>
  );
};
