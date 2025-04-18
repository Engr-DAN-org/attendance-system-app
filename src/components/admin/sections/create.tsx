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
import WeeklyCalendar from "./components/weekly-calendar";
import { useSectionCreationContext } from "./context/create-section-context";
import { AddScheduleDialog } from "./components/add-schedule-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

export default function SectionForm() {
  const {
    sectionForm: form,
    onFormSubmit,
    setOpenScheduleDialog,
    classSchedules,
    courseSelectData,
    usersQueryData,
    updateTeachersQuery,
    updateCourseQuery,
    isUsersQueryPending,
    isCourseQueryPending,
  } = useSectionCreationContext();

  const courseSelects: OptionTypes =
    courseSelectData?.data.map((course) => ({
      value: course.id.toString(),
      label: course.code,
    })) || [];

  const teacherSelects: OptionTypes =
    usersQueryData?.data.map((teacher) => ({
      value: (teacher.id ?? "").toString(),
      label: teacher.fullName,
    })) || [];

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className="space-y-6 mx-auto py-6"
        >
          {/* Section: Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl">
            {/* Course Selection Next */}
            <FormComboField<typeof sectionSchema>
              onSearch={(value) => {
                console.log(value);
                updateCourseQuery(value);
              }}
              className="w-full max-w-60 col-span-full"
              form={form}
              name="courseId"
              label="Course"
              options={courseSelects}
              isLoading={isCourseQueryPending}
            />

            {/* Section Name First */}
            <FormInputField<typeof sectionSchema>
              className="w-full md:max-w-72  "
              form={form}
              name="name"
              label="Name"
              placeholder="Section Name"
            />

            {/* Year Level After Course */}
            <FormSelectField<typeof sectionSchema>
              className="w-full md:max-w-40 "
              form={form}
              name="yearLevel"
              label="Year Level"
              options={yearLevelOptions}
            />

            {/* Teacher Selection Last */}

            <FormComboField<typeof sectionSchema>
              onSearch={(value) => {
                console.log(value);
                updateTeachersQuery(value);
              }}
              className="w-full md:max-w-96 "
              form={form}
              name="teacherId"
              label="Adviser"
              options={teacherSelects}
              isLoading={isUsersQueryPending}
            />

            <FormTextAreaField<typeof sectionSchema>
              form={form}
              className="w-full col-span-full"
              name="description"
              label="Description"
              placeholder="Section Description"
            />
          </div>

          {/* Section: Description */}
          <div></div>

          {/* Section: Class Schedule */}
          <div>
            <div className="flex flex-row justify-between mb-2">
              <h3 className="text-lg font-medium mb-2">Class Schedule</h3>
              <Button
                type="button"
                variant="default"
                onClick={() => setOpenScheduleDialog(true)}
              >
                <PlusIcon /> Add Schedule
              </Button>
            </div>

            <WeeklyCalendar data={classSchedules} />
          </div>

          {/* Optional Submit */}
          {/* <Button type="submit" className="ml-auto block">Save</Button> */}
        </form>
      </Form>
      <AddScheduleDialog />
    </>
  );
}
