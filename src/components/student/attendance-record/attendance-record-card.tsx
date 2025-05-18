import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow, format } from "date-fns";
import { MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import { attendanceStatusCallTypes } from "@/enums/attendanceStatus";
import getNameInitials from "@/utils/avatar.util";
import { ClassSchedule } from "@/interfaces/types/classSchedule";

interface Props {
  record: AttendanceRecord;
  classSchedule: ClassSchedule;
}

export default function AttendanceRecordCard({ record }: Props) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-md rounded-2xl p-4">
      <CardHeader className="flex items-center gap-4 p-0 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/avatars/01.png" alt="@shadcn" />
          <AvatarFallback>{getNameInitials(record.studentName)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-base font-medium">
            {record.studentName}
          </CardTitle>
          <Badge
            className={cn(
              "text-xs px-2 py-0.5 rounded-full font-semibold",
              attendanceStatusCallTypes.get(record.status)
            )}
          >
            {record.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-muted-foreground">
        {record.clockInRecord && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              Checked in at{" "}
              <span className="text-foreground font-medium">
                {format(new Date(record.clockInRecord), "p")}
              </span>
            </span>
          </div>
        )}

        {record.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{record.location}</span>
          </div>
        )}

        {record.distance !== undefined && (
          <div>
            Distance from class location:{" "}
            <span className="text-foreground font-medium">
              {record.distance.toFixed(2)} meters
            </span>
          </div>
        )}

        {record.createdAt && (
          <div>
            Logged{" "}
            <span className="text-foreground font-medium">
              {formatDistanceToNow(new Date(record.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
