import { useUserQueryContext } from "@/components/admin/users/context/users-context";
import { FormComboField } from "@/components/form-components/form-command";
import { FormInputField } from "@/components/form-components/form-input";
import ContentSection from "@/components/general/content-section";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSelectDataContext } from "@/context/select-data-context";
import { UserRole } from "@/enums/userRole";
import GeneralError from "@/features/errors/general-error";
import NotFoundError from "@/features/errors/not-found-error";
import { UserCredForm, userCredFormSchema } from "@/interfaces/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/_authenticated/admin/users/$userId/")({
  component: RouteComponent,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
});

function RouteComponent() {
  const {
    selectedUser: user,
    isUpdateCredPending,
    handleUpdateUserCred,
  } = useUserQueryContext();
  const form = useForm<UserCredForm>({
    resolver: zodResolver(userCredFormSchema),
    defaultValues: user ? { ...user, userRole: user.role } : null,
  });

  const { sectionSelectData, updateSelectSectionQuery, isSectionQueryPending } =
    useSelectDataContext();

  return (
    <ContentSection
      title="User Profile"
      desc="View and manage user profile here."
      headerBtns={<>{/*  */}</>}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => handleUpdateUserCred(data))}
          className="space-y-8 "
        >
          <div className="grid lg:grid-cols-3 gap-2 lg:gap-4">
            <div className="col-span-full">
              <FormInputField<typeof userCredFormSchema>
                form={form}
                name="idNumber"
                label="ID Number"
                className="lg:max-w-1/4"
              />
            </div>
            {user.role == UserRole.Student && (
              <div className="col-span-full">
                <FormComboField<typeof userCredFormSchema>
                  label="Course-Section"
                  form={form}
                  name="sectionId"
                  options={sectionSelectData}
                  isLoading={isSectionQueryPending}
                  onSearch={updateSelectSectionQuery}
                />
              </div>
            )}
            <div className="">
              <FormInputField<typeof userCredFormSchema>
                form={form}
                name="firstName"
                label="First Name"
              />
            </div>
            <div className="lg:col-span-2">
              <FormInputField<typeof userCredFormSchema>
                form={form}
                name="lastName"
                label="Last Name"
                className="lg:max-w-1/2"
              />
            </div>
            <div className="col-span-full">
              <FormInputField<typeof userCredFormSchema>
                form={form}
                name="email"
                label="Email"
                className="lg:max-w-1/2"
              />
            </div>
            <div className="col-span-full">
              <FormInputField<typeof userCredFormSchema>
                form={form}
                name="phoneNumber"
                label="Phone Number (optional)"
                className="lg:max-w-1/3"
              />
            </div>
          </div>
          <Button disabled={isUpdateCredPending} type="submit">
            {isUpdateCredPending && <Loader2 className=" animate-spin" />}
            {isUpdateCredPending ? "Updating..." : "Update profile"}
          </Button>
        </form>
      </Form>
    </ContentSection>
  );
}
