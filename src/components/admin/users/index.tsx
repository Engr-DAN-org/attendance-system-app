import { Main } from "@/components/layout/main";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UsersTable } from "./components/users-table";

import { LoadingComponent } from "@/components/general-loader";
import { useUserQueryContext } from "@/components/admin/users/context/users-context";

export default function Users() {
  const { response, isAnyPendingRefetch } = useUserQueryContext();
  const isLoading = isAnyPendingRefetch();
  // Parse user list
  // const userList = userListSchema.parse(users);
  return (
    <>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Users List</h2>
            <p className="text-muted-foreground">
              Manage Teachers and Student in your organization here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        {isLoading ? (
          <LoadingComponent />
        ) : response?.data ? (
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <UsersTable data={response.data} columns={columns} />
          </div>
        ) : null}
      </Main>
      <UsersDialogs />
    </>
  );
}
