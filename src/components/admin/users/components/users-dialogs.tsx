import { useUserQueryContext } from "../context/users-context";
import { InviteStudentDialog } from "./invite-student-dialog";
import { InviteTeacherDialog } from "./invite-teacher-dialog";
import { UsersDeleteDialog } from "./users-delete-dialog";

export function UsersDialogs() {
  const { dialogOpen, setDialogOpen, selectedUser, setSelectedUser } =
    useUserQueryContext();
  return (
    <>
      <InviteTeacherDialog
        key="teacher-invite"
        open={dialogOpen === "add-teacher"}
        onOpenChange={() => {
          setDialogOpen(null);
        }}
      />

      <InviteStudentDialog
        key="student-invite"
        open={dialogOpen === "add-student"}
        onOpenChange={() => setDialogOpen(null)}
      />

      {selectedUser && (
        <>
          <InviteTeacherDialog
            key={`teacher-edit-${selectedUser.id}`}
            open={dialogOpen === `edit-${selectedUser.role.toLowerCase()}`}
            onOpenChange={() => {
              setDialogOpen(null);
              setTimeout(() => {
                setSelectedUser(null);
              }, 10);
            }}
            currentRow={selectedUser}
          />

          <InviteStudentDialog
            key={`student-edit-${selectedUser.id}`}
            open={dialogOpen === "edit-student"}
            selectedUser={selectedUser}
            onOpenChange={() => {
              setDialogOpen(null);
              setTimeout(() => {
                setSelectedUser(null);
              }, 10);
            }}
          />

          <UsersDeleteDialog
            key={`user-delete-${selectedUser.id}`}
            open={dialogOpen === "delete"}
            onOpenChange={() => {
              setDialogOpen(null);
              setSelectedUser(null);
            }}
            currentRow={selectedUser}
          />
        </>
      )}
    </>
  );
}
