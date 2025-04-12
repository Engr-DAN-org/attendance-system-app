"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { teacherSchema, User } from "@/interfaces/types/user";
import { toast } from "sonner";
import { UserRole } from "@/enums/userRole";

type UserForm = z.infer<typeof teacherSchema>;

interface Props {
  currentRow?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteTeacherDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow;
  const form = useForm<UserForm>({
    resolver: zodResolver(teacherSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          idNumber: "",
          firstName: "",
          lastName: "",
          email: "",
          role: UserRole.Teacher,
          phoneNumber: "",
        },
  });

  const onSubmit = (values: UserForm) => {
    form.reset();
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>
            {isEdit ? "Edit Teacher" : "Invite New Teacher"}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the teacher here. " : "Create new teacher here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="-mr-4  w-full py-1 pr-4">
          <Form {...form}>
            <form
              id="teacher-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5 cursor-pointer"
            >
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      ID Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a Unique ID Number."
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@gmail.com"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+123456789"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  // form="teacher-form"
                  className="cursor-pointer"
                >
                  {isEdit ? "Save changes" : "Send Invite"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
