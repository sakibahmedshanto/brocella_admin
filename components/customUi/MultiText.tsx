"use client"
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}
const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (item: string) => {
    onChange(item);
    setInputValue("");
  };
  return (
    <div>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag(inputValue);
          }
        }}
      />
      <div className="flex gap-1 flew-wrap mt-4">
        {value.map((tag,index)=>(
            <Badge key={index} className="bg-grey-1  text-white-1" variant="outline">{tag}
            
            <Button className="ml-1 rounded-full outline-none hover:bg-red-1" size="sm"  onClick={
             ()=>onRemove(tag)
            }><X  className="h-2 w-2" /></Button></Badge>

        ))}
      </div>
    </div>
  );
};

export default MultiText;
