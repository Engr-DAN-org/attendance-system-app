import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { toast } from "sonner";
import { Course, CourseForm, courseSchema } from "@/interfaces/types/course";
import { courseYearOptions } from "@/constants/courseYear";
import { Dispatch, SetStateAction } from "react";
import { createAsync, updateAsync } from "@/services/course.service";

const initialFormState: CourseForm = {
  name: "",
  code: "",
  description: "",
  years: "4",
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course?: CourseForm; // For updating a course
  setEditCourse: Dispatch<SetStateAction<Course | undefined>>;
}

export function CourseDialog({
  open,
  onOpenChange,
  course,
  setEditCourse,
}: Props) {
  // const [open, setOpen] = useState<boolean>(false);
  // Default form values for new course or editing existing one
  const form = useForm<CourseForm>({
    resolver: zodResolver(courseSchema),
    defaultValues: course ?? initialFormState, // If course is passed, use it for editing
  });

  const onSubmit = async (values: CourseForm) => {
    const data = course ? await updateAsync(values) : await createAsync(values);

    console.log(data);

    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    form.reset();
    onOpenChange(false);
    setEditCourse(undefined);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogTrigger asChild>
        <Button className="space-x-1" onClick={() => onOpenChange(false)}>
          <span>Create</span> <IconPlus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <IconMailPlus /> {course ? "Update Course" : "Create Course"}
          </DialogTitle>
          <DialogDescription>
            {course
              ? "Update the details of the course."
              : "Create a new course by providing its details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="course-dialog-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
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
              control={form.control}
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
            <FormField
              control={form.control}
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
              control={form.control}
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
          <Button type="submit" form="course-dialog-form">
            {course ? "Save Changes" : "Create Course"} <IconSend />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
