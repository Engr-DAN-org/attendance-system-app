import { LoadingComponent } from "@/components/general-loader";
import { useSubjectContext } from "./context/subject-context";
import { SubjectsTable } from "./components/subjects-table";
import { subjectColumns } from "./components/subjects-columns";
import { SubjectDeleteDialog } from "./components/subject-delete-dialog";

export const SubjectsPage = () => {
  const { subjectQueryResponse, isSubjectQueryPending } = useSubjectContext();
  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            List of Subjects
          </h2>
          <p className="text-muted-foreground">
            Manage Your Subjects Here. You can add, edit, and delete subjects.
            <br />
          </p>
        </div>
        {/* <UsersPrimaryButtons /> */}
      </div>
      {isSubjectQueryPending ? (
        <LoadingComponent className="max-h-96" />
      ) : subjectQueryResponse?.data ? (
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <SubjectsTable
            data={subjectQueryResponse.data}
            columns={subjectColumns}
          />
        </div>
      ) : null}
      <SubjectDeleteDialog />
    </>
  );
};
