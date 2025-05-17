import { useClassSessionContext } from "../context/class-session-context";
import AttendanceRecordOverrideDialog from "./dialog-attendance-record-override";

const ClassSessionDialogs = () => {
  const { attendanceRecord } = useClassSessionContext();
  return (
    <>
      {attendanceRecord && (
        <>
          <AttendanceRecordOverrideDialog currentRow={attendanceRecord} />
        </>
      )}
    </>
  );
};

export default ClassSessionDialogs;
