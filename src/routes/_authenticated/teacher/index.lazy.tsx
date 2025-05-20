import { Main } from "@/components/layout/main";
import ClassScheduleCard from "@/components/student/dashboard/class-schedule-card";
import DateTimeBox from "@/components/student/dashboard/date-time-box";
import { useTeacherContext } from "@/components/teacher/context/teacher.context";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ClassSession } from "@/interfaces/types/classSession";
import { getFirstOngoingClassAsync } from "@/services/class-session.service";
import { useAuthStore } from "@/store/authStore";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  CalendarIcon,
  CheckCircle2,
  Info,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/_authenticated/teacher/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore((state) => state);

  const { teacherSchedules } = useTeacherContext();

  const [ongoingSession, setOngoingSession] = useState<
    ClassSession | undefined
  >(undefined);

  useEffect(() => {
    async function fetchOngoingSession() {
      const session = await getFirstOngoingClassAsync();
      setOngoingSession(session);
    }
    fetchOngoingSession();
  }, []);

  const todaySchedule = (teacherSchedules || [])?.filter(
    (schedule) => Number(schedule.day) == new Date().getDay()
  );

  return (
    <Main fixed>
      <ScrollArea>
        <div className="sticky top-o">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white  flex items-center gap-2">
            <User className="size-8 md:size-10 text-blue-500" />
            Welcome, {user?.fullName}
          </h1>
          <Separator className="my-2 md:my-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Column */}
          <div className="space-y-6">
            {/* Date Card */}
            <DateTimeBox />

            {/* Ongoing Class Card */}

            {/* Ongoing Class Card - Enhanced */}
            <Card className="shadow-sm mb-6 group hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-4">
                {ongoingSession ? (
                  <Link
                    to="/teacher/class-schedule/$scheduleId/session/$sessionId"
                    params={{
                      scheduleId: ongoingSession.classScheduleId.toString(),
                      sessionId: ongoingSession.id,
                    }}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-600 md:text-3xl">
                          Ongoing Class Session
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Click to move to the ongoing class session page.
                          <ArrowRight className=" h-3 w-3 inline ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                      <span className="text-xs font-medium text-green-700">
                        Live
                      </span>
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                      <Info className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        No Active Session
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Currently no classes in progress
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
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
                    <ClassScheduleCard classSchedule={classItem} key={index} />
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
}
