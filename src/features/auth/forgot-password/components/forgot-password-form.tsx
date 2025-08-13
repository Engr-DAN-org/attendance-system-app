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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { sendForgotPassword } from "@/services/auth.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type ForgotFormProps = HTMLAttributes<HTMLDivElement> & {
  setEmail: (email: string) => void;
};

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Invalid email address" }),
});

export function ForgotForm({ setEmail, className, ...props }: ForgotFormProps) {
  const { mutateAsync: sendForgotPasswordEmail, isPending: isSending } =
    useMutation({
      mutationFn: async (data: { email: string }) => {
        await sendForgotPassword(data.email);
        setEmail(data.email);
      },
      onSuccess: () => {
        toast.success("Password reset email sent successfully!");
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  //   sendForgotPasswordEmail(data);
  const onSubmit = async (data: { email: string }) => {
    await sendForgotPasswordEmail(data);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" disabled={isSending}>
              {isSending && <Loader2 className=" animate-spin" />}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
