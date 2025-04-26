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
import { ClassScheduleInfoButton } from "./components/info-button";
import { ScheduleClickType } from "./components/schedule-event";
import { useSelectDataContext } from "@/context/select-data-context";

export default function SectionForm() {
  const {
    courseSelectData,
    updateSelectCourseQuery: updateCourseQuery,
    isCourseQueryPending,
  } = useSelectDataContext();
  const {
    sectionForm: form,
    onFormSubmit,
    setOpenScheduleDialog,
    fields,
    usersQueryData,
    updateTeachersQuery,
    isUsersQueryPending,
    editSchedule,
  } = useSectionCreationContext();

  const onScheduleClick: ScheduleClickType = ({ index }) => {
    if (index !== undefined && !isNaN(index)) editSchedule(index);
  };

  const teacherSelects: OptionTypes =
    usersQueryData?.data.map((teacher) => ({
      value: (teacher.id ?? "").toString(),
      label: teacher.fullName,
    })) || [];

  return (
    <>
      <Form {...form}>
        <form
          id="section-form"
          onSubmit={form.handleSubmit(onFormSubmit, (errors) =>
            console.log("Validation Errors:", errors)
          )}
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
              options={courseSelectData}
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
              <div className="flex justify-center items-center gap-1 mb-2">
                <h3 className="text-lg font-medium">Class Schedule</h3>
                <ClassScheduleInfoButton
                  hasError={form.formState.errors.classSchedules ? true : false}
                />
                <div className="flex justify-center text-nowrap items-center">
                  {form.formState.errors?.classSchedules && (
                    <p className="text-xs text-destructive ">
                      {form.formState.errors.classSchedules.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="button"
                variant="default"
                onClick={() => setOpenScheduleDialog(true)}
              >
                <PlusIcon /> Schedule
              </Button>
            </div>

            <WeeklyCalendar data={fields} onScheduleClick={onScheduleClick} />
          </div>

          {/* Optional Submit */}
          {/* <Button type="submit" className="ml-auto block">Save</Button> */}
        </form>
      </Form>
      <AddScheduleDialog />
    </>
  );
}
