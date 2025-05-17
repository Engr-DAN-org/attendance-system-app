import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { startAsync } from "@/services/class-session.service";
import { useClassSessionContext } from "../context/class-session-context";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { revalidateGeoLocationPermission } from "@/utils/permission-checker.util";
import { useState } from "react";
import { getLocationWithCoordinates } from "@/services/navigator.service";
import { Loader2 } from "lucide-react";

interface Props {
  scheduleId: number;
  refetchFn: () => void;
}

const StartSessionButton = ({ scheduleId, refetchFn }: Props) => {
  const { classSessionForm } = useClassSessionContext();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStartSession = async () => {
    const canSetLocation = await revalidateGeoLocationPermission();
    console.log("canSetLocation", canSetLocation);
    if (!canSetLocation) {
      setDialogOpen(false);
      return;
    }
    try {
      setIsLoading(true);

      const { latitude, location, longitude } =
        await getLocationWithCoordinates();
      classSessionForm.setValue("classScheduleId", scheduleId);
      classSessionForm.setValue("latitude", latitude);
      classSessionForm.setValue("longitude", longitude);
      classSessionForm.setValue(
        "startTime",
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      classSessionForm.setValue("location", location);

      console.log("Session started", classSessionForm.getValues());
      const formValues = classSessionForm.getValues();
      const newClassSession = await startAsync(formValues);
      toast.success("Class session started successfully");
      refetchFn();
      console.log("newClassSession", newClassSession);
      classSessionForm.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={(state) => setDialogOpen(state)}>
        <DialogTrigger asChild>
          <Button>Start Class</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Start Class</DialogTitle>
            <DialogDescription>
              Starting the class will notify all students and start the session.
              Continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button disabled={isLoading} onClick={() => handleStartSession()}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Executing
                </>
              ) : (
                <>Continue</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StartSessionButton;
