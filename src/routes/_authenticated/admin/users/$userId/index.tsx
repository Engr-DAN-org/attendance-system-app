import { useUserQueryContext } from "@/components/admin/users/context/users-context";
import { FormInputField } from "@/components/form-components/form-input";
import ContentSection from "@/components/general/content-section";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import GeneralError from "@/features/errors/general-error";
import NotFoundError from "@/features/errors/not-found-error";
import { UserCredForm, userCredFormSchema } from "@/interfaces/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/_authenticated/admin/users/$userId/")({
  component: RouteComponent,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
});

function RouteComponent() {
  const { selectedUser: user } = useUserQueryContext();
  const form = useForm<UserCredForm>({
    resolver: zodResolver(userCredFormSchema),
    defaultValues: user ? { ...user } : null,
  });

  const onSubmit = (data: UserCredForm) => {
    console.log("Form data", data);
  };
  const errorSub = (e: unknown) => {
    console.error("Error submitting form", e);
  };
  //   const
  return (
    <ContentSection
      title="User Profile"
      desc="View and manage user profile here."
      headerBtns={<>{/*  */}</>}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, errorSub)}
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
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </ContentSection>
  );
}
