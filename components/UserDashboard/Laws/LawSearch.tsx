"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

interface LawSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const LawSearch = ({ searchQuery, onSearchChange }: LawSearchProps) => {
  return (
    <Card className="p-4">
      <div className="relative">
        <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search laws, guidelines, and requirements..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 py-2"
        />
      </div>
    </Card>
  );
};
