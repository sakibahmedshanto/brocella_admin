"use client";
import React, { ReactNode } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}
const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  let selected: CollectionType[];
  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }
  const selectables = collections.filter(
    (collection) => !selected.includes(collection)
  );
  // console.log(value);
  return (
    <div className="border border-grey-1 rounded-md">
      <Command className="overflow-visible bg-white">
        <div className="flex gap-2 flex-wrap border-black rounded-md">
          <div>
            {selected.map((collection) => (
              <Badge key={collection._id}>
                {" "}
                {collection.title}
                <button
                  className="ml-1 hover:text-red-1"
                  onClick={() => onRemove(collection._id)}
                >
                  <X className="h-3 w-3"></X>
                </button>
              </Badge>
            ))}
          </div>

          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={setInputValue}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
          />
          <div className="relative mt-2 w-full">
            {open && (
              <CommandGroup className="absolute w-full z-10 top-0 border rounded-md shadow-lg max-h-60 overflow-auto">
                {selectables.length > 0 ? (
                  selectables.map((collection) => (
                    <CommandItem
                      key={collection._id}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={() => {
                      onChange(collection._id);
                      setInputValue("");
                      }}
                      className="cursor-pointer hover:bg-red-200"
                    >
                      {collection.title}
                    </CommandItem>
                  ))
                ) : (
                  <CommandEmpty>No options available</CommandEmpty>
                )}
              </CommandGroup>
            )}
          </div>
        </div>
      </Command>
    </div>
  );
};

export default MultiSelect;
