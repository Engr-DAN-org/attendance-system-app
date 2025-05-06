import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FormComboField,
  OptionTypes,
} from "@/components/form-components/form-command";
import {
  FormInputField,
  FormTextAreaField,
} from "@/components/form-components/form-input";
import { FormSelectField } from "@/components/form-components/form-select";
import { Form } from "@/components/ui/form";
import { yearLevelOptions } from "@/constants/courseYear";
import { sectionSchema } from "@/interfaces/types/section";
import { useSelectDataContext } from "@/context/select-data-context";
import { useSectionCreationContext } from "../context/create-section-context";
import { PlusIcon } from "lucide-react";

export default function SectionFormDialog() {
  const {
    openDialog,
    setOpenDialog,
    courseSelectData,
    updateSelectCourseQuery: updateCourseQuery,
    isCourseQueryPending,
  } = useSelectDataContext();
  const {
    sectionForm: form,
    onFormSubmit,
    usersQueryData,
    updateTeachersQuery,
    isUsersQueryPending,
  } = useSectionCreationContext();

  const teacherSelects: OptionTypes =
    usersQueryData?.data.map((teacher) => ({
      value: (teacher.id ?? "").toString(),
      label: teacher.fullName,
    })) || [];

  const handleClose = () => {
    setOpenDialog(false);
    form.reset();
  };

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(state) => {
        setOpenDialog(state);

        if (!state) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          Create <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Section</DialogTitle>
          <DialogDescription>
            Fill in the form to create a new section.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="section-form"
            onSubmit={form.handleSubmit(onFormSubmit, (errors) =>
              console.log("Validation Errors:", errors)
            )}
            className="space-y-6 py-2"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Course Selection */}
              <FormComboField<typeof sectionSchema>
                onSearch={(value) => {
                  console.log(value);
                  updateCourseQuery(value);
                }}
                className="w-full max-w-60 md:col-span-2"
                form={form}
                name="courseId"
                label="Course"
                options={courseSelectData}
                isLoading={isCourseQueryPending}
              />
              <div className="hidden md:block"></div>

              {/* Year Level */}
              <FormSelectField<typeof sectionSchema>
                className="w-full max-w-40"
                form={form}
                name="yearLevel"
                label="Year Level"
                options={yearLevelOptions}
              />
              {/* Section Name */}
              <FormInputField<typeof sectionSchema>
                className="w-full md:max-w-72 md:col-span-2"
                form={form}
                name="name"
                label="Name"
                placeholder="Section Name"
              />

              {/* Adviser */}
              <FormComboField<typeof sectionSchema>
                onSearch={(value) => {
                  console.log(value);
                  updateTeachersQuery(value);
                }}
                className="w-full md:max-w-96 col-span-full"
                form={form}
                name="teacherId"
                label="Adviser (optional)"
                options={teacherSelects}
                isLoading={isUsersQueryPending}
              />

              {/* Description */}
              <FormTextAreaField<typeof sectionSchema>
                form={form}
                className="w-full col-span-full"
                name="description"
                label="Description (optional)"
                placeholder="Section Description"
              />
            </div>

            {/* Footer inside form (for submit button) */}
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Save Section</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
