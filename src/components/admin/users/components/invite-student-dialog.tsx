import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconMailPlus, IconSend } from "@tabler/icons-react";
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
import { UserRole } from "@/enums/userRole";
import {
  User,
  UserCompleteForm,
  userCompleteFormSchema,
} from "@/interfaces/types/user";
import { SelectDropdown } from "@/components/select-dropdown";
import { StudentGuardianRelationshipOptions } from "@/enums/studentGuardianRelationship";
import { useState } from "react";
import { useUserQueryContext } from "../context/users-context";
import { FormComboField } from "@/components/form-components/form-command";
import { useSelectDataContext } from "@/context/select-data-context";
import { Save } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser?: User;
}

export function InviteStudentDialog({
  open,
  onOpenChange,
  selectedUser,
}: Props) {
  console.log(selectedUser);

  const isEdit = !!selectedUser;
  const [step, setStep] = useState<1 | 2>(1);
  const { submitForm } = useUserQueryContext();
  const { sectionSelectData, updateSelectSectionQuery, isSectionQueryPending } =
    useSelectDataContext();

  const form = useForm<UserCompleteForm>({
    resolver: zodResolver(userCompleteFormSchema),
    defaultValues: selectedUser
      ? { ...selectedUser, userRole: selectedUser.role }
      : { userRole: UserRole.Student },
  });

  const onSubmit = async (values: UserCompleteForm) => {
    await submitForm(values);
    form.reset();
    prevStep();

    onOpenChange(false);
  };

  /**
   * move to the next step
   */
  const nextStep = () => {
    form
      .trigger([
        "idNumber",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "sectionId",
      ])
      .then((isValid) => {
        console.log("Is Valid:", isValid);

        if (isValid) setStep(2);
      });

    console.log(form.formState.errors);
  };

  /**
   * move to the first step
   */
  const prevStep = () => setStep(1);

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        prevStep();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <IconMailPlus /> Student Invitation
          </DialogTitle>
          <DialogDescription>
            Invite a new student. <br /> The login credentials will be sent to
            their email.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="user-invite-form"
            onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
            className="space-y-4"
          >
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="Enter a Unique ID Number."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormComboField<typeof userCompleteFormSchema>
                  label="Course-Section"
                  form={form}
                  name="sectionId"
                  options={sectionSelectData}
                  isLoading={isSectionQueryPending}
                  onSearch={updateSelectSectionQuery}
                />
                <div className="flex flex-col md:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            inputMode="text"
                            placeholder="Registered First Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            inputMode="text"
                            placeholder="Registered Last Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="eg: john.doe@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 2 && (
              <>
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-lg font-medium">Guardian Information</h3>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="guardian.firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Guardian's First Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guardian.lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Guardian's Last Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="guardian.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="guardian@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guardian.contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="09XXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guardian.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Guardian's Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guardian.relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <SelectDropdown
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select Relationship"
                          items={StudentGuardianRelationshipOptions.map(
                            ({ label, value }) => ({
                              label,
                              value,
                            })
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </form>
        </Form>
        <DialogFooter className="gap-y-2 flex justify-between">
          {/* <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose> */}
          {step === 1 ? (
            <Button size={"default"} type="button" onClick={() => nextStep()}>
              Next
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => prevStep()}
              >
                Back
              </Button>
              <Button type="submit" form="user-invite-form">
                {isEdit ? (
                  <>
                    Save Changes <Save />
                  </>
                ) : (
                  <>
                    Invite <IconSend />
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
