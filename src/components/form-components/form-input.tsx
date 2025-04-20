import { Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z, ZodObject, ZodRawShape } from "zod";
import { Textarea } from "../ui/textarea";
import { InputHTMLAttributes } from "react";

interface FormInputFieldProps<TSchema extends ZodObject<ZodRawShape>>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "form"> {
  form: UseFormReturn<z.infer<TSchema>>;
  name: Path<z.infer<TSchema>>;
  label?: string;
  placeholder?: string;
}

export const FormInputField = <TSchema extends ZodObject<ZodRawShape>>({
  form,
  name,
  label,
  placeholder,
  ...props
}: FormInputFieldProps<TSchema>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={form.getValues(name)}
      render={({ field }) => (
        <FormItem {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} placeholder={placeholder ? placeholder : ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormTextAreaField = <TSchema extends ZodObject<ZodRawShape>>({
  form,
  name,
  label,
  placeholder,
  ...props
}: FormInputFieldProps<TSchema>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={form.getValues(name)}
      render={({ field }) => (
        <FormItem {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea {...field} placeholder={placeholder ? placeholder : ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
