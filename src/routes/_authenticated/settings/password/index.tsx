import { createFileRoute } from "@tanstack/react-router";
import { FormInputField } from "@/components/form-components/form-input";
import ContentSection from "@/components/general/content-section";
import { useProfileContext } from "@/components/general/context/profile.contex";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_authenticated/settings/password/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { resetPassword, isResetPending } = useProfileContext();

  const form = useForm<PasswordResetForm>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <ContentSection
      title="Reset Password"
      desc="Update your account's password. Only admins can perform this action."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            const response = await resetPassword(values);
            console.log(response);

            form.reset();
          })}
          className="space-y-8"
        >
          <div className="grid lg:grid-cols-3 gap-2 lg:gap-4">
            <FormInputField<typeof passwordResetSchema>
              form={form}
              name="oldPassword"
              type="password"
              label="Old Password"
              className="col-span-full lg:max-w-1/2"
            />
            <FormInputField<typeof passwordResetSchema>
              form={form}
              name="newPassword"
              type="password"
              label="New Password"
              className="col-span-full lg:max-w-1/2"
            />
            <FormInputField<typeof passwordResetSchema>
              form={form}
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              className="col-span-full lg:max-w-1/2"
            />
          </div>
          <Button disabled={isResetPending} type="submit">
            {isResetPending && <Loader2 className="animate-spin mr-2" />}
            Reset Password
          </Button>
        </form>
      </Form>
    </ContentSection>
  );
}

// 🔐 Schema for password reset
const passwordResetSchema = z
  .object({
    oldPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordResetForm = z.infer<typeof passwordResetSchema>;
