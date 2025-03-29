import { HTMLAttributes } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PinInput, PinInputField } from "@/components/pin-input";

type OtpFormProps = HTMLAttributes<HTMLDivElement> & {
  isLoading: boolean;
  disabledBtn: boolean;
  setDisabledBtn: (disabled: boolean) => void;
  submitHandler: (code: string) => void;
};

const formSchema = z.object({
  code: z.string().min(1, { message: "Please enter your 2FA code." }),
});

export function OtpForm({
  className,
  isLoading,
  disabledBtn,
  setDisabledBtn,
  submitHandler,
  ...props
}: OtpFormProps) {
  // const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    submitHandler(data.code);
    // setIsLoading(true);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    // setTimeout(() => {
    //   setIsLoading(false);
    //   navigate({ to: "/" });
    // }, 1000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <PinInput
                      {...field}
                      className="flex h-10 justify-between"
                      onComplete={() => setDisabledBtn(false)}
                      onIncomplete={() => setDisabledBtn(true)}
                    >
                      {Array.from({ length: 7 }, (_, i) => {
                        if (i === 3)
                          return <Separator key={i} orientation="vertical" />;
                        return (
                          <PinInputField
                            key={i}
                            component={Input}
                            className={`${form.getFieldState("code").invalid ? "border-red-500" : ""}`}
                          />
                        );
                      })}
                    </PinInput>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" disabled={disabledBtn || isLoading}>
              Verify
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
