import { Link, useRouter } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import AuthLayout from "../auth-layout";
import { ForgotForm } from "./components/forgot-password-form";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordAsync } from "@/services/auth.service";
import { toast } from "sonner";
import { useState } from "react";
import { OtpForm } from "../sign-in/components/otp-form";

export default function ForgotPassword() {
  const { navigate } = useRouter();
  const [email, setEmail] = useState<string>("");

  const { mutateAsync: resetPassword, isPending: isResetting } = useMutation({
    mutationFn: async (code: string) =>
      await resetPasswordAsync({ email, code }),
    onSuccess: () => {
      toast.success("Password reset successfully! Redirecting to sign in...");
      setTimeout(() => {
        navigate({ to: "/sign-in" });
      }, 1000);
    },
  });

  return (
    <AuthLayout>
      <Card className="p-6">
        <div className="mb-2 flex flex-col space-y-2 text-left">
          <h1 className="text-md font-semibold tracking-tight">
            Forgot Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your registered email.
          </p>
        </div>
        {!email.trim() ? (
          <ForgotForm
            setEmail={(email) => {
              setEmail(email);
            }}
          />
        ) : (
          <OtpForm
            isLoading={isResetting}
            disabledBtn={!email.trim()}
            setDisabledBtn={() => {}}
            submitHandler={async (code) => {
              await resetPassword(code);
            }}
          />
        )}
        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            to="/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>
          .
        </p>
      </Card>
    </AuthLayout>
  );
}
