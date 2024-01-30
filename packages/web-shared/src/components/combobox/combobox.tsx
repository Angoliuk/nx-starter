"use client";

import { ArrayElement } from "@/shared/types";
import { tw } from "@/tailwind";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { Button } from "../button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

export type ComboboxProps<T extends { label: string; value: string }[]> = {
  emptyText?: string;
  onSelect: (newValue: ArrayElement<T> | null) => unknown;
  options: T;
  placeholder?: string;
};

export const Combobox = <T extends { label: string; value: string }[]>({
  emptyText,
  onSelect,
  options,
  placeholder,
}: ComboboxProps<T>) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ArrayElement<T> | null>(null);

  const handleSelect: (value: string) => void = currentValue => {
    if (currentValue === selected?.value) {
      setSelected(null);
      onSelect(null);
    } else {
      const newValue = options.find(option => option.value === currentValue) ?? null;
      setSelected(newValue);
      onSelect(newValue);
    }

    setOpen(false);
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button aria-expanded={open} className="w-[200px] justify-between" role="combobox" variant="outline">
          {selected ? selected.label : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{emptyText}</CommandEmpty>
          <CommandGroup>
            {options.map(option => (
              <CommandItem key={option.value} onSelect={handleSelect} value={option.value}>
                <CheckIcon
                  className={tw("ml-auto h-4 w-4", selected?.value === option.value ? "opacity-100" : "opacity-0")}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
