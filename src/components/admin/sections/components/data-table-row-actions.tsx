import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Section } from "@/interfaces/types/section";
import { useSectionContext } from "../context/section-context";
import { useSectionCreationContext } from "../context/create-section-context";

interface DataTableRowActionsProps {
  row: Row<Section>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setTargetDeletion } = useSectionContext();
  const { sectionForm, setOpenSectionDialog } = useSectionCreationContext();
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => {
              const section = row.original;
              sectionForm.reset({
                id: section.id,
                courseId: section.courseId.toString(),
                name: section.name,
                yearLevel: section.yearLevel.toString(),
                teacherId: section.teacher?.id,
                description: section.description,
                classSchedules: section.classSchedules,
              });
              setOpenSectionDialog(true);
            }}
          >
            Edit
            <DropdownMenuShortcut>
              <IconEdit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              const section = row.original;
              setTargetDeletion(section);
            }}
            className="!text-red-500"
          >
            Delete
            <DropdownMenuShortcut>
              <IconTrash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
