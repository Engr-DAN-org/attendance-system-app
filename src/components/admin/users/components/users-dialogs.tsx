import { UsersDialogType } from "../context/use-user-logic";
import { useUserQueryContext } from "../context/users-context";
import { InviteTeacherDialog } from "./invite-teacher-dialog";
import { UsersDeleteDialog } from "./users-delete-dialog";
import { UsersInviteDialog } from "./users-invite-dialog";

export function UsersDialogs() {
  const { dialogOpen, setDialogOpen, selectedUser, setSelectedUser } =
    useUserQueryContext();
  return (
    <>
      <InviteTeacherDialog
        key="teacher-invite"
        open={dialogOpen === "add-teacher"}
        onOpenChange={() => setDialogOpen("add-teacher")}
      />

      <UsersInviteDialog
        key="student-invite"
        open={dialogOpen === "add-student"}
        onOpenChange={() => setDialogOpen("add-student")}
      />

      {selectedUser && (
        <>
          <InviteTeacherDialog
            key={`user-edit-${selectedUser.id}`}
            open={dialogOpen === `edit-${selectedUser.role.toLowerCase()}`}
            onOpenChange={() => {
              setDialogOpen(
                `edit-${selectedUser.role.toLowerCase()}` as UsersDialogType
              );
              setTimeout(() => {
                setSelectedUser(null);
              }, 500);
            }}
            currentRow={selectedUser}
          />

          <UsersDeleteDialog
            key={`user-delete-${selectedUser.id}`}
            open={dialogOpen === "delete"}
            onOpenChange={() => {
              setDialogOpen("delete");
              setTimeout(() => {
                setSelectedUser(null);
              }, 500);
            }}
            currentRow={selectedUser}
          />
        </>
      )}
    </>
  );
}
