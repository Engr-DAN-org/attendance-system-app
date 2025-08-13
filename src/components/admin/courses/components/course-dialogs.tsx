import { IconMailPlus, IconPlus, IconSend } from "@tabler/icons-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectDropdown } from "@/components/select-dropdown";
import { CourseForm } from "@/interfaces/types/course";
import { courseYearOptions } from "@/constants/courseYear";
// import IconSelector from "./course-icon-selector";
import { useCourseContext } from "@/components/admin/courses/context/course-context";

export function CourseDialog() {
  // const [open, setOpen] = useState<boolean>(false);
  // Default form values for new course or editing existing one
  const {
    courseForm,
    dialogState,
    setDialogState,
    submitForm,
    isFormSubmitPending,
    editCourse,
    setEditCourse,
  } = useCourseContext();

  const onSubmit = async (data: CourseForm) => {
    await submitForm(data);
    courseForm.reset({}); // Reset the form after submission
    setDialogState(""); // Close the dialog
  };

  return (
    <Dialog
      open={dialogState == "form"}
      onOpenChange={(state) => {
        setDialogState(state ? "form" : "");
        if (state == false) {
          setEditCourse(null);
          courseForm.reset({});
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="space-x-1"
          onClick={() => {
            courseForm.reset({});
            setEditCourse(null);
          }}
        >
          <span>Create</span> <IconPlus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <IconMailPlus /> {editCourse ? "Update Course" : "Create Course"}
          </DialogTitle>
          <DialogDescription>
            {editCourse
              ? "Update the details of the course."
              : "Create a new course by providing its details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...courseForm}>
          <form
            id="course-dialog-form"
            onSubmit={courseForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="flex flex-row gap-2 justify-start items-center">
              {/* <FormField
                control={courseForm.control}
                name="iconId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <div className="">
                        <IconSelector
                          onIconSelect={field.onChange}
                          selectedIconId={field.value}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={courseForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Code</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="eg: BSCS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={courseForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="eg: Bachelor of Science in Computer Science"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={courseForm.control}
              name="years"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Course Years</FormLabel>
                  <SelectDropdown
                    defaultValue={String(field.value)}
                    onValueChange={field.onChange}
                    placeholder="Select number of years"
                    items={courseYearOptions.map(({ label, value }) => ({
                      label,
                      value: String(value),
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={courseForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Add Course Description (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            form="course-dialog-form"
            disabled={isFormSubmitPending}
          >
            {editCourse ? "Save Changes" : "Create Course"} <IconSend />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
