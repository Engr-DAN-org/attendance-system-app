import { UserAuthForm } from "./components/user-auth-form";
import AuthLayout from "../auth-layout";
import { Card } from "../../../components/ui/card";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { OtpForm } from "./components/otp-form";
import { LoginDTO } from "../../../interfaces/auth";
import { login, verify2fa } from "../../../services/auth.service";
import {
  FailedLoginResponseDTO,
  SuccessLoginResponseDTO,
} from "../../../interfaces/responseDTO";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOTP, setIsOTP] = useState<boolean>(false);
  const [otpEmail, setOtpEmail] = useState<string>("");
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

  const onLoginSubmit = async (request: LoginDTO) => {
    try {
      setIsLoading(true);

      const response = await login(request);
      console.log(response);

      const { responseType, message, email } =
        response as SuccessLoginResponseDTO;
      // const { email } = response.data as { email: string };
      setOtpEmail(email);
      setIsOTP(true);

      toast.info(responseType, {
        description: <code className="text-gray-700">{message}</code>,
      });
    } catch (e: unknown) {
      const { response } = e as AxiosError & {
        response?: AxiosResponse & {
          data: FailedLoginResponseDTO;
        };
      };
      const statusText = response?.statusText;
      const data = response?.data;
      console.log(e);

      toast.error(<div>{statusText}</div>, {
        description: (
          <code className="text-gray-700">
            {data?.message ?? "Something Went Wrong."}
          </code>
        ),
      });
    }
    // const response = await coldStart();
    // if
    // console.log(response);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const onOTPSubmit = async (code: string) => {
    try {
      setIsLoading(true);

      const { responseType, message, ...response } = await verify2fa({
        email: otpEmail,
        code,
      });
      console.log(response);

      toast.success(responseType, {
        description: <code className="text-gray-700">{message}</code>,
      });
    } catch (e) {
      const { response } = e as AxiosError & {
        response?: AxiosResponse & {
          data: FailedLoginResponseDTO;
        };
      };
      const statusText = response?.statusText;
      const responseType = response?.data?.responseType;
      const message = response?.data?.message;

      console.log(e);
      toast.error(responseType ?? statusText, {
        description: (
          <code className="text-gray-700">
            {message ?? "Something Went Wrong."}
          </code>
        ),
      });
    }
    // const response = await coldStart();
    // if
    // console.log(response);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <AuthLayout>
      {isOTP ? (
        <Card className="p-6">
          <div className="mb-2 flex flex-col space-y-2 text-left">
            <h1 className="text-md font-semibold tracking-tight">
              Two-factor Authentication
            </h1>
            <p className="text-sm text-muted-foreground">
              Please enter the authentication code. <br /> We have sent the
              authentication code to your email.
            </p>
          </div>
          <OtpForm
            disabledBtn={disabledBtn}
            isLoading={isLoading}
            setDisabledBtn={setDisabledBtn}
            submitHandler={onOTPSubmit}
          />
          <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
            Haven't received it?{" "}
            <Link
              to="/sign-in"
              className="underline underline-offset-4 hover:text-primary"
            >
              Resend a new code.
            </Link>
            .
          </p>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Login using your email or ID No. <br />
            </p>
          </div>
          <UserAuthForm isLoading={isLoading} submitHandler={onLoginSubmit} />
          <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
            By clicking login, you agree to our{" "}
            <a
              href="/coming-soon"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/coming-soon"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </Card>
      )}
    </AuthLayout>
  );
}
