import OptionsButton from "@/components/options-button";
import { Card } from "@/components/ui/card";
import { courseIcons } from "@/constants/courseIcons";
import { Course } from "@/interfaces/types/course";
import { useCourseContext } from "@/components/admin/courses/context/course-context";
import IconSelector from "./course-icon-selector";

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const { openDeleteDialog, openEditCourse, updateCourseIcon } =
    useCourseContext();

  const courseLogo =
    courseIcons.find((icon) => icon.id == course.iconId) ?? courseIcons[0];

  return (
    <>
      <Card
        key={course.id}
        className="rounded-lg border p-4 hover:shadow-md transition"
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex flex-row gap-2 items-center">
            <div
              className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2 ${courseLogo.color}`}
            >
              <IconSelector
                selectedIconId={course.iconId}
                onIconSelect={(iconId) =>
                  updateCourseIcon({ courseId: course.id, iconId })
                }
              />
              {/* <courseLogo.icon className="size-6" /> */}
            </div>
            <span className="font-semibold text-xl">{course.code}</span>
          </div>
          <OptionsButton
            onDelete={() => openDeleteDialog(course)}
            key={course.id}
            onEdit={() => openEditCourse(course)}
          />
        </div>
        <div>
          <h2 className="mb-1 font-semibold">{course.name}</h2>
          <p className="line-clamp-2 text-gray-500">{course.description}</p>
        </div>
      </Card>
    </>
  );
};
