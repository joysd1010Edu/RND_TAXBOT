"use client";
import { Card } from "@/components/ui/card";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

interface LawSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const LawSearch = ({ searchQuery, onSearchChange }: LawSearchProps) => {
  return (
    <Card className="p-4">
      <div className=" flex items-center gap-4 ">
        <HiOutlineMagnifyingGlass className=" text-blue-950 transform  w-5 h-5" />
        <input
          type="text"
          placeholder="Search laws, guidelines, and requirements..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className=" focus:outline-none w-full py-2"
        />
      </div>
    </Card>
  );
};
