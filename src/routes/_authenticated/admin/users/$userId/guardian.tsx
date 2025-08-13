import { useUserQueryContext } from "@/components/admin/users/context/users-context";
import { FormInputField } from "@/components/form-components/form-input";
import { FormSelectField } from "@/components/form-components/form-select";
import ContentSection from "@/components/general/content-section";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { StudentGuardianRelationshipOptions } from "@/enums/studentGuardianRelationship";
import { GuardianForm, guardianSchema } from "@/interfaces/types/guardian";
import { UserCompleteForm } from "@/interfaces/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute(
  "/_authenticated/admin/users/$userId/guardian"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    selectedUser: user,
    submitForm,
    isFormSubmitPending,
  } = useUserQueryContext();
  const form = useForm<GuardianForm>({
    resolver: zodResolver(guardianSchema),
    defaultValues: user ? { ...user.guardian, studentId: user.id } : null,
  });

  const onSubmit = async (data: GuardianForm) => {
    const userData: UserCompleteForm = { ...user, guardian: data };
    return await submitForm(userData);
  };

  return (
    <ContentSection
      title="Guardian Credentials"
      desc="View and manage the student's guardian credentials."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="grid lg:grid-cols-3 gap-2 lg:gap-4">
            <div className="">
              <FormInputField<typeof guardianSchema>
                form={form}
                name="firstName"
                label="First Name"
              />
            </div>
            <div className="lg:col-span-2">
              <FormInputField<typeof guardianSchema>
                form={form}
                name="lastName"
                label="Last Name"
                className="lg:max-w-1/2"
              />
            </div>
            <div className="col-span-full">
              <FormInputField<typeof guardianSchema>
                form={form}
                name="email"
                label="Email"
                className="lg:max-w-1/2"
              />
            </div>
            <div className="col-span-full">
              <FormInputField<typeof guardianSchema>
                form={form}
                name="address"
                label="Address"
                className="lg:max-w-2/3"
              />
            </div>
            <div className="col-span-full">
              <FormInputField<typeof guardianSchema>
                form={form}
                name="contactNumber"
                label="Contact Number"
                className="lg:max-w-1/3"
              />
            </div>
            <div className="col-span-full">
              <FormSelectField<typeof guardianSchema>
                form={form}
                name="relationship"
                label="Relationship"
                options={StudentGuardianRelationshipOptions}
                className="lg:max-w-1/3"
              />
            </div>
          </div>
          <Button disabled={isFormSubmitPending} type="submit">
            {isFormSubmitPending && <Loader2 className=" animate-spin" />}
            {isFormSubmitPending ? "Updating..." : "Update"}
          </Button>
        </form>
      </Form>
    </ContentSection>
  );
}
