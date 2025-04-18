"use client";

import { z, ZodObject, ZodRawShape } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Path, PathValue, UseFormReturn } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { InputHTMLAttributes, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils"; // Utility for conditional classNames
import { ChevronsUpDown, Check } from "lucide-react";

interface FormComboFieldProps<TSchema extends ZodObject<ZodRawShape>>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "form"> {
  form: UseFormReturn<z.infer<TSchema>>;
  name: Path<z.infer<TSchema>>;
  label?: string;
  options: OptionType[];
  placeholder?: string;
  emptyMessage?: string;
  onSearch: (value: string) => void;
  isLoading?: boolean | (() => boolean);
}

export interface OptionType {
  label: string;
  value: number | string;
}

export type OptionTypes = OptionType[];

export const FormComboField = <TSchema extends ZodObject<ZodRawShape>>({
  form,
  name,
  label,
  options,
  placeholder,
  emptyMessage,
  onSearch,
  isLoading,
  ...props
}: FormComboFieldProps<TSchema>) => {
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selected = options.find((opt) => opt.value === field.value);
        return (
          <FormItem {...props}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {selected?.label || placeholder || "Select an option"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    shouldFilter={false} // ✨ disables built-in filtering
                  >
                    <CommandInput
                      onInput={(e) => {
                        const value = e.currentTarget.value;
                        onSearch(value);
                      }}
                      placeholder="Search..."
                    />
                    <CommandList>
                      <CommandEmpty>
                        {isLoading
                          ? "Loading..."
                          : emptyMessage || "No item found."}
                      </CommandEmpty>
                      <CommandGroup>
                        {options.map((option) => (
                          <CommandItem
                            key={option.value}
                            onSelect={() => {
                              setOpen(false);
                              field.onChange(
                                option.value as PathValue<
                                  z.infer<TSchema>,
                                  Path<z.infer<TSchema>>
                                >
                              );
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                option.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
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
