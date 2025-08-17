import {
  FormInputField,
  FormTextAreaField,
} from "@/components/form-components/form-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { IconMailPlus, IconPlus, IconSend } from "@tabler/icons-react";
import { useSubjectContext } from "../context/subject-context";
import { SubjectSchema } from "@/interfaces/types/subject";
import { FormMultiSelectComboField } from "@/components/form-components/form-multi-select-combo-field";
import { Loader2 } from "lucide-react";

export const SubjectDialog = () => {
  const {
    subject: selectedSubject,
    subjectForm,
    openSubjectDialog,
    setOpenSubjectDialog,
    onFormSubmit,
    isFormSubmitPending,
    usersQueryData,
  } = useSubjectContext();

  interface OptionType {
    [key: string]: string | number;
  }
  const teacherSelects: OptionType[] =
    usersQueryData?.data.map((teacher) => ({
      teacherId: (teacher.id ?? "").toString(),
      label: teacher.fullName,
    })) || [];

  return (
    <Dialog
      open={openSubjectDialog}
      onOpenChange={(state) => {
        setOpenSubjectDialog(state);
        subjectForm.reset({});
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="space-x-1"
          onClick={() => {
            subjectForm.reset();
            setOpenSubjectDialog(false);
          }}
        >
          <span>Add Subject</span> <IconPlus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <IconMailPlus />{" "}
            {selectedSubject ? "Update Subject" : "Create Subject"}
          </DialogTitle>
          <DialogDescription>
            {selectedSubject
              ? "Update the details of the subject."
              : "Create a new subject by providing its details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...subjectForm}>
          <form
            id="subject-dialog-form"
            onSubmit={subjectForm.handleSubmit(onFormSubmit)}
            className="space-y-4"
          >
            <div className="flex flex-row gap-2 justify-start items-center">
              {/* <FormField
                control={subjectForm.control}
                name="iconId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <div className="">
                        <IconSelector
                          onIconSelect={field.onChange}
                          selectedIconId={field.value}
                form={subjectForm as UseFormReturn<z.infer<typeof subjectFormSchema>>}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-2 ">
                <FormInputField<typeof SubjectSchema>
                  form={subjectForm}
                  name="code"
                  label="Subject Code"
                  placeholder="e.g. CS101"
                  className="col-span-1"
                />
                <FormInputField<typeof SubjectSchema>
                  form={subjectForm}
                  name="name"
                  label="Subject Name"
                  placeholder="Enter subject name"
                  className="col-span-1 lg:col-span-2"
                />
              </div>
            </div>
            <FormMultiSelectComboField<typeof SubjectSchema>
              form={subjectForm}
              name="subjectTeachers"
              label="Teachers"
              valueKey="teacherId"
              options={teacherSelects}
            />
            <FormTextAreaField<typeof SubjectSchema>
              form={subjectForm}
              name="description"
              label="Description"
              placeholder="Enter subject description"
            />
          </form>
        </Form>
        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isFormSubmitPending}
            form="subject-dialog-form"
          >
            {isFormSubmitPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <IconSend />
            )}
            {selectedSubject ? "Save Changes" : "Create Subject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
