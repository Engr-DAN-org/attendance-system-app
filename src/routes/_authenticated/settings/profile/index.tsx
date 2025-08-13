import { FormInputField } from "@/components/form-components/form-input";
import ContentSection from "@/components/general/content-section";
import { useProfileContext } from "@/components/general/context/profile.contex";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UserCompleteForm, userCredFormSchema } from "@/interfaces/types/user";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/_authenticated/settings/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isAdmin } = useAuthStore((state) => state);
  const { updateProfile, isUpdatePending } = useProfileContext();

  const form = useForm<UserCompleteForm>({
    resolver: zodResolver(userCredFormSchema),
    defaultValues: user ? { ...user, userRole: user.role, id: user.id } : null,
  });

  return (
    <ContentSection
      title="Personal Information"
      desc="View and manage your personal information."
      headerBtns={<>{/*  */}</>}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            async (values) => await updateProfile(values)
          )}
          className="space-y-8 "
        >
          <div className="grid lg:grid-cols-3 gap-2 lg:gap-4">
            <div className="col-span-full">
              <FormInputField<typeof userCredFormSchema>
                form={form}
                disabled={!isAdmin()}
                name="idNumber"
                label="ID Number"
                className="lg:max-w-1/4"
              />
            </div>
            <div className="">
              <FormInputField<typeof userCredFormSchema>
                form={form}
                disabled={!isAdmin()}
                name="firstName"
                label="First Name"
              />
            </div>
            <div className="lg:col-span-2">
              <FormInputField<typeof userCredFormSchema>
                form={form}
                disabled={!isAdmin()}
                name="lastName"
                label="Last Name"
                className="lg:max-w-1/2"
              />
            </div>
            <div className="col-span-full">
              <FormInputField<typeof userCredFormSchema>
                form={form}
                disabled={!isAdmin()}
                name="email"
                label="Email"
                className="lg:max-w-1/2"
              />
            </div>
            <div className="col-span-full">
              <FormInputField<typeof userCredFormSchema>
                form={form}
                disabled={!isAdmin()}
                name="phoneNumber"
                label="Phone Number (optional)"
                className="lg:max-w-1/3"
              />
            </div>
          </div>
          <Button disabled={isUpdatePending || !isAdmin()} type="submit">
            {isUpdatePending && <Loader2 className="animate-spin" />}
            {isAdmin() ? "Update profile" : "Only admin can make changes"}
          </Button>
        </form>
      </Form>
    </ContentSection>
  );
}
