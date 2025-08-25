import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { startAsync } from "@/services/class-session.service";
import { useClassSessionContext } from "../context/class-session-context";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { revalidateGeoLocationPermission } from "@/utils/permission-checker.util";
import { useEffect, useState } from "react";
import { getLocationWithCoordinates } from "@/services/navigator.service";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form-components/form-input";
import { ClassSessionFormSchema } from "@/interfaces/types/classSession";
import { FormCheckboxField } from "@/components/form-components/form-checkbox";

interface Props {
  scheduleId: number;
  refetchFn: () => void;
}

const StartSessionButton = ({ scheduleId, refetchFn }: Props) => {
  const { classSessionForm } = useClassSessionContext();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getInitialLocation() {
      const locationData = await getLocationWithCoordinates();

      classSessionForm.setValue("location", locationData.location);
      classSessionForm.setValue("latitude", locationData.latitude);
      classSessionForm.setValue("longitude", locationData.longitude);
    }

    getInitialLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen]);

  const isRemote = classSessionForm.watch("isRemote"); // Watch the isRemote field

  const handleStartSession = async () => {
    const canSetLocation = await revalidateGeoLocationPermission();
    console.log("canSetLocation", canSetLocation);
    if (!canSetLocation && !isRemote) {
      // Only check location permission if not remote
      setDialogOpen(false);
      return;
    }
    try {
      setIsLoading(true);

      let latitude = null;
      let longitude = null;

      if (!isRemote) {
        const locationData = await getLocationWithCoordinates();

        latitude = locationData.latitude;
        longitude = locationData.longitude;
      }

      classSessionForm.setValue("classScheduleId", scheduleId);
      classSessionForm.setValue("latitude", isRemote ? null : latitude);
      classSessionForm.setValue("longitude", isRemote ? null : longitude);
      classSessionForm.setValue(
        "startTime",
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      console.log("Session started", classSessionForm.getValues());
      const formValues = classSessionForm.getValues();
      const newClassSession = await startAsync(formValues);
      toast.success("Class session started successfully");
      refetchFn();
      console.log("newClassSession", newClassSession);
      classSessionForm.reset({});
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
    <Dialog open={dialogOpen} onOpenChange={(state) => setDialogOpen(state)}>
      <DialogTrigger asChild>
        <Button>Start Class</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start Class</DialogTitle>
          <DialogDescription>
            Starting the class will notify all students and start the session.
            <Form {...classSessionForm}>
              <form
                className="space-y-4 text-primary"
                onSubmit={classSessionForm.handleSubmit(handleStartSession)}
              >
                <FormCheckboxField<typeof ClassSessionFormSchema>
                  form={classSessionForm}
                  name="isRemote"
                  label="Remote Session"
                  description="Check if this is a remote/online class"
                />

                {!isRemote && ( // Only show location field if not remote
                  <FormInputField<typeof ClassSessionFormSchema>
                    form={classSessionForm}
                    name="location"
                    label="Location"
                    placeholder="Enter class location"
                  />
                )}
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isLoading} onClick={() => handleStartSession()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting...
              </>
            ) : (
              "Start Session"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StartSessionButton;
