import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { OngoinScheduleBox } from "../class-schedule/ongoing-schedule-box";
import DateTimeBox from "./date-time-box";
import { Separator } from "@/components/ui/separator";
import { Main } from "@/components/layout/main";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClassScheduleCard from "./class-schedule-card";
import { useAuthStore } from "@/store/authStore";
import { useClassScheduleContext } from "@/components/admin/class-schedule/class-schedule-context";
import { useEffect } from "react";
import { AttendanceStatus } from "@/enums/attendanceStatus";
import { useStudentContext } from "../context/student.context";
import { useRouter } from "@tanstack/react-router";

const StudentDashboard = () => {
  const { user } = useAuthStore((state) => state);
  const { sectionClassScheduleList, setSectionId } = useClassScheduleContext();
  const { navigate } = useRouter();
  const {
    attendanceRecords: unmarkedRecord,
    setQuery,
    refetchRecords,
  } = useStudentContext();

  useEffect(() => {
    setQuery({
      studentIdNumber: user.idNumber,
      status: [AttendanceStatus.Unmarked],
    });
    setSectionId(user.sectionId);

    refetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const todaySchedule =
    sectionClassScheduleList?.filter(
      (classItem) => classItem.day == new Date().getDay().toString()
    ) || [];

  return (
    <Main fixed>
      <ScrollArea>
        <div className="sticky top-o">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8 flex items-center gap-2">
            <User className="size-8 md:size-10 text-blue-500" />
            Welcome, {user?.fullName}
          </h1>
          <Separator />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Column */}
          <div className="space-y-6">
            {/* Date Card */}
            <DateTimeBox />

            {/* Ongoing Class Card */}
            <OngoinScheduleBox
              classIsOngoing={(unmarkedRecord ?? []).length > 0}
              unmarkedRecord={(unmarkedRecord ?? [])[0]}
            />
          </div>

          {/* Today's Schedule Card */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2 text-gray-900 dark:text-white">
                <CalendarIcon className="size-5 lg:size-7 text-blue-500" />
                Today&apos;s Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todaySchedule.length > 0 ? (
                <div className="space-y-4">
                  {todaySchedule?.map((classItem, index) => (
                    <ClassScheduleCard
                      classSchedule={classItem}
                      key={index}
                      className="cursor-pointer"
                      onClick={() =>
                        navigate({
                          to: `/student/class-schedule/$scheduleId`,
                          params: { scheduleId: classItem.id },
                        })
                      }
                    />
                  ))}
                </div>
              ) : (
                <Alert variant="default">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No classes scheduled today</AlertTitle>
                  <AlertDescription>Enjoy your free day!</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </Main>
  );
};

export default StudentDashboard;
