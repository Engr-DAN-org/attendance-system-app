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

const StartSessionButton = () => {
  return (
    <>
      <Dialog>
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
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StartSessionButton;
