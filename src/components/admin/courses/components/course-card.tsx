import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Course } from "@/interfaces/types/course";
import { Pencil, Trash2 } from "lucide-react";

interface CourseCardProps {
  course: Course;
  handleDelete: (id: number) => void;
  openEdit: (course: Course) => void;
}

export const CourseCard = ({
  course,
  handleDelete,
  openEdit,
}: CourseCardProps) => {
  return (
    <Card
      key={course.id}
      className="rounded-2xl border shadow-md transition hover:shadow-lg"
    >
      <div className="bg-muted p-4 rounded-t-2xl">
        <h3 className="text-lg font-semibold text-primary">{course.name}</h3>
        <p className="text-sm text-muted-foreground">{course.code}</p>
      </div>
      <div className="p-4 space-y-2">
        <p className="text-sm">
          <span className="font-medium text-muted-foreground">Years:</span>{" "}
          {course.years}
        </p>
        <p className="text-sm">{course.description}</p>
        <div className="flex justify-end gap-2 pt-4">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => openEdit(course)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            className="rounded-full"
            onClick={() => handleDelete(course.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
