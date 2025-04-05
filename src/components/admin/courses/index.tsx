// components/CourseManager.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Course } from "@/interfaces/types/course";
import { CourseDialog } from "./components/course-dialogs";

const sampleCourses: Course[] = [
  {
    id: 1,
    name: "Bachelor of Science in Computer Science",
    code: "BSCS",
    years: "4",
    description:
      "Focuses on the study of algorithms, computer systems, and software design.",
  },
  {
    id: 2,
    name: "Bachelor of Science in Information Technology",
    code: "BSIT",
    years: "4",
    description:
      "Emphasizes software development, networking, and systems management.",
  },
  {
    id: 3,
    name: "Bachelor of Arts in Communication",
    code: "BAComm",
    years: "4",
    description:
      "Covers media studies, public relations, and interpersonal communication.",
  },
  {
    id: 4,
    name: "Bachelor of Science in Business Administration",
    code: "BSBA",
    years: "4",
    description:
      "Prepares students for careers in management, marketing, and finance.",
  },
  {
    id: 5,
    name: "Bachelor of Secondary Education - Major in English",
    code: "BSEd-Eng",
    years: "4",
    description:
      "Prepares future educators for teaching English at the secondary level.",
  },
  {
    id: 6,
    name: "Bachelor of Science in Nursing",
    code: "BSN",
    years: "4",
    description:
      "Equips students with knowledge and skills in health care and patient treatment.",
  },
];

export default function CourseManager() {
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | undefined>(undefined);

  const handleEdit = (course: Course) => {
    setEditCourse(course);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id != id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Courses</h2>
        <CourseDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          course={editCourse}
          setEditCourse={setEditCourse}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="rounded-2xl border shadow-md transition hover:shadow-lg"
          >
            <div className="bg-muted p-4 rounded-t-2xl">
              <h3 className="text-lg font-semibold text-primary">
                {course.name}
              </h3>
              <p className="text-sm text-muted-foreground">{course.code}</p>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium text-muted-foreground">
                  Years:
                </span>{" "}
                {course.years}
              </p>
              <p className="text-sm">{course.description}</p>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => handleEdit(course)}
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
        ))}
      </div>
    </div>
  );
}
