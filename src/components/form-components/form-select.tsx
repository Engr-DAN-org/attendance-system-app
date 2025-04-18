import { z, ZodObject, ZodRawShape } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Path, UseFormReturn } from "react-hook-form";
import { SelectDropdown } from "../select-dropdown";
import { InputHTMLAttributes } from "react";

interface FormSelectFieldProps<TSchema extends ZodObject<ZodRawShape>>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "form"> {
  form: UseFormReturn<z.infer<TSchema>>;
  name: Path<z.infer<TSchema>>;
  label?: string;
  options: optionType[];
  placeholder?: string;
}

type optionType = {
  label: string;
  value: string | number;
};

export const FormSelectField = <TSchema extends ZodObject<ZodRawShape>>({
  form,
  name,
  label,
  options,
  placeholder,
  ...props
}: FormSelectFieldProps<TSchema>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <SelectDropdown
              defaultValue={field.value}
              onValueChange={field.onChange}
              placeholder={placeholder ? placeholder : ""}
              items={options.map(({ value, label }) => ({
                label: label,
                value: value as string,
              }))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
