import { OptionTypes } from "@/components/form-components/form-command";
import { CourseQueryOption } from "@/config/useOptions/courseOption";
import { SectionQueryOption } from "@/config/useOptions/sectionQueryOptions";
import {
  initialCourseQuery,
  initialSectionQuery,
} from "@/initialStates/queryStates";
import { CourseQuery } from "@/interfaces/queryParams/courseQuery";
import { SectionQuery } from "@/interfaces/queryParams/sectionQuery";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useSelectDataLogic = () => {
  const [courseSelectQuery, setCourseSelectQuery] =
    useState<CourseQuery>(initialCourseQuery);
  const [selectSectionQuery, setSelectSectionQuery] =
    useState<SectionQuery>(initialSectionQuery);

  // Course Query
  const { data: courseData, isPending: isCourseQueryPending } = useQuery(
    CourseQueryOption(courseSelectQuery)
  );
  const courseSelectData: OptionTypes = (courseData?.data ?? []).map(
    (course) => ({
      id: course.id,
      code: course.code,
      name: course.name,
      value: course.id,
      label: course.code,
    })
  );

  const updateSelectCourseQuery = (code: string) => {
    setCourseSelectQuery({ ...courseSelectQuery, code });
    console.log("Course Query:", courseSelectQuery);
  };

  const { data: sectionData, isPending: isSectionQueryPending } = useQuery(
    SectionQueryOption(selectSectionQuery)
  );

  const updateSelectSectionQuery = (courseCode: string) => {
    setSelectSectionQuery({ ...selectSectionQuery, courseCode });
    console.log("Section Query:", selectSectionQuery);
  };

  const sectionSelectData: OptionTypes = (sectionData?.data ?? []).map(
    (section) => ({
      id: section.id,
      value: section.id ?? "", // Provide a fallback value for undefined
      label: `${section.course?.code} ${section.yearLevel}-${section.name}`,
      name: section.name,
      courseCode: section.course?.code,
      yearLevel: section.yearLevel,
    })
  );

  return {
    // Section Query
    selectSectionQuery,
    sectionSelectData,
    isSectionQueryPending,
    updateSelectSectionQuery,
    // Course Query
    courseSelectQuery,
    updateSelectCourseQuery,
    courseSelectData,
    isCourseQueryPending,
  };
};
