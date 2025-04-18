// import { initialSectionQuery } from "@/initialStates/queryStates";
// import { SectionQuery } from "@/interfaces/queryParams/sectionQuery";
// import { useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";

import { CourseQueryOption } from "@/config/useOptions/courseOption";
import { userQueryOption } from "@/config/useOptions/userQueryOptions";
import { courseYearOptions } from "@/constants/courseYear";
import { UserRole } from "@/enums/userRole";
import {
  initialCourseQuery,
  initialUsersQuery,
} from "@/initialStates/queryStates";
import { CourseQuery } from "@/interfaces/queryParams/courseQuery";
import { UserQuery } from "@/interfaces/queryParams/userQuery";
import { Section, sectionSchema } from "@/interfaces/types/section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

// export const useSectionLogic = () => {
//   const queryClient = useQueryClient();
//   const [query, setQuery] = useState<SectionQuery>(initialSectionQuery);
//   const [dialogOpen, setDialogOpen] = useState<boolean>(false);
//   const [editSection, setEditSection] = useState<Section>(undefined);

//   return {
//     query,
//     setQuery,
//   };
// };

export const useSectionCreationLogic = () => {
  const [section, setSection] = useState<Section | undefined>(undefined);
  const [openScheduleDialog, setOpenScheduleDialog] = useState<boolean>(false);
  const [courseQuery, setCourseQuery] =
    useState<CourseQuery>(initialCourseQuery);
  const [teachersQuery, setTeachersQuery] = useState<UserQuery>({
    ...initialUsersQuery,
    role: [UserRole.Teacher],
  });

  const sectionForm = useForm<Section>({
    resolver: zodResolver(sectionSchema),
    defaultValues: section
      ? { ...section }
      : {
          name: "",
          description: "",
          yearLevel: courseYearOptions[0].value,
          courseId: undefined,
          teacherId: undefined,
          classSchedules: [],
        },
  });
  const classSchedules = useWatch({
    control: sectionForm.control,
    name: "classSchedules",
  });

  // Course Query
  const { data: courseSelectData, isPending: isCourseQueryPending } = useQuery(
    CourseQueryOption(courseQuery)
  );

  const { data: usersQueryData, isPending: isUsersQueryPending } = useQuery(
    userQueryOption(teachersQuery)
  );

  const { fields, append, remove } = useFieldArray({
    control: sectionForm.control,
    name: "classSchedules",
  });

  const onFormSubmit = (data: Section) => {
    console.log("Form submitted:", data);
  };

  const updateCourseQuery = (code: string) => {
    setCourseQuery({ ...courseQuery, code });
    console.log("Course Query:", courseQuery);
  };

  const updateTeachersQuery = (name: string) => {
    setTeachersQuery({ ...teachersQuery, name });
    console.log("Teachers Query:", teachersQuery);
  };

  return {
    updateTeachersQuery,
    usersQueryData,
    courseQuery,
    updateCourseQuery,
    courseSelectData,
    isCourseQueryPending,
    isUsersQueryPending,
    openScheduleDialog,
    setOpenScheduleDialog,
    section,
    setSection,
    sectionForm,
    fields,
    append,
    remove,
    onFormSubmit,
    classSchedules,
  };
};
