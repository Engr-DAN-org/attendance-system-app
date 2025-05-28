import { Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { z, ZodTypeAny } from "zod";
import { Checkbox } from "../ui/checkbox";

interface FormCheckboxFieldProps<TSchema extends ZodTypeAny> {
  form: UseFormReturn<z.infer<TSchema>>;
  name: Path<z.infer<TSchema>>;
  label?: string;
  description?: string;
}

export const FormCheckboxField = <TSchema extends ZodTypeAny>({
  form,
  name,
  label,
  description,
}: FormCheckboxFieldProps<TSchema>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel>{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
