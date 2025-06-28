"use client";
import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, Search } from "lucide-react";
import getCountryFlag from "country-flag-icons/unicode";

interface SelectCountryProps {
  field: {
    options: Array<{
      label: string;
      value: string;
      icon: string;
    }>;
  };
  input: {
    value: string;
    onChange: (value: string) => void;
  };
}

const SelectCountry = ({ field, input }: SelectCountryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredOptions = field.options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Select.Root value={input.value} onValueChange={input.onChange}>
      <Select.Trigger className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <div className="flex items-center gap-2">
          {input.value && (
            <span className="text-lg">
              {getCountryFlag(input.value.toUpperCase())}
            </span>
          )}
          <Select.Value />
        </div>
        <Select.Icon>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          className="relative z-[999999] !max-h-[30vh] min-w-[8rem] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <div className="flex items-center gap-2 p-2 border-b">
            <Search className="h-4 w-4 opacity-50" />
            <input
              className="flex h-8 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-popover">
            <ChevronDown className="h-4 w-4 rotate-180" />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            {filteredOptions.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {getCountryFlag(option.value.toUpperCase())}
                  </span>
                  <span>{option.label}</span>
                </div>
                <Select.ItemIndicator className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                  <Check className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-popover">
            <ChevronDown className="h-4 w-4" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectCountry;
