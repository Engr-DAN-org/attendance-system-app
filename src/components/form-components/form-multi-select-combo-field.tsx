import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z, ZodObject, ZodRawShape, ZodTypeAny } from "zod";
import { Path, UseFormReturn } from "react-hook-form";
import { InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface OptionType {
  [key: string]: string | number;
}

interface FormMultiSelectComboFieldProps<TSchema extends ZodTypeAny>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "form"> {
  form: UseFormReturn<z.infer<TSchema>>;
  name: Path<z.infer<TSchema>>;
  label?: string;
  options: OptionType[];
  placeholder?: string;
  emptyMessage?: string;
  noSelectedMessage?: string;

  /** Field name in selected item for value (e.g., "id" or "userId") */
  valueKey?: string;

  /** Field name in selected item for label (e.g., "name" or "fullName") */
  labelKey?: string;
}

export const FormMultiSelectComboField = <
  TSchema extends ZodObject<ZodRawShape>,
>({
  form,
  name,
  label,
  options,
  placeholder,
  emptyMessage = "No item found.",
  noSelectedMessage = "No items selected.",
  valueKey = "value",
  labelKey = "label",
  ...props
}: FormMultiSelectComboFieldProps<TSchema>) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState<boolean>(false); // new

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={form.getValues(name)}
      render={({ field }) => {
        const selectedValues = field.value || [];

        const toggleSelection = (option: OptionType) => {
          const exists = selectedValues.some(
            (item: OptionType) => item[valueKey] == option[valueKey]
          );

          const newItem = {
            [valueKey]: option[valueKey],
            [labelKey]: option[labelKey],
          };

          const newValue = exists
            ? selectedValues.filter(
                (item: OptionType) => item[valueKey] != option[valueKey]
              )
            : [...selectedValues, newItem];

          field.onChange(newValue);
        };

        // const removeSelection = (value: string | number) => {
        //   field.onChange(
        //     selectedValues.filter((item: OptionType) => item[valueKey] != value)
        //   );
        // };

        const filteredOptions = options.filter((option) =>
          String(option[labelKey]).toLowerCase().includes(query.toLowerCase())
        );

        return (
          <FormItem {...props} className="cursor-text overflow-visible">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Popover open={isFocused} onOpenChange={setIsFocused}>
                <div className="border rounded-md p-2 relative">
                  <ScrollArea className="max-h-[80px]">
                    {selectedValues.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedValues.map((item: OptionType) => (
                          <Badge
                            key={item[valueKey]}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {item[labelKey]}
                            {/* <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => {
                                removeSelection(item[valueKey]);
                              }}
                            /> */}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        {noSelectedMessage}
                      </span>
                    )}
                  </ScrollArea>

                  {/* ✅ Transparent layer that only catches clicks in empty space */}
                  <PopoverTrigger asChild>
                    <div
                      onClick={() => setIsFocused(true)}
                      className="absolute inset-0 z-10"
                      style={{
                        // let clicks "pass through" where there are children
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        className="w-full h-full"
                        style={{
                          pointerEvents: "auto",
                        }}
                      />
                    </div>
                  </PopoverTrigger>
                </div>

                <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                  <Command className="mt-1 w-full rounded-md border bg-background shadow-md transition duration-150">
                    <CommandInput
                      placeholder={placeholder || "Search..."}
                      value={query}
                      onValueChange={setQuery}
                    />
                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                    <CommandGroup className="max-h-[200px] overflow-auto">
                      {filteredOptions.map((option) => {
                        const isSelected = selectedValues.some(
                          (item: OptionType) =>
                            item[valueKey] == option[valueKey]
                        );
                        return (
                          <CommandItem
                            key={option[valueKey]}
                            className={clsx("cursor-pointer", {
                              "bg-muted": isSelected,
                            })}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleSelection(option)}
                              className="mr-2"
                            />
                            {option[labelKey]}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
