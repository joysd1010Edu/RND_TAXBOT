"use client";

import React, { useEffect, useRef, useState } from "react";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { Input } from "@/components/ui/input";

type DatePickerFieldProps = {
  id: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const displayDatePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;

const isValidDateParts = (day: number, month: number, year: number) => {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

export const formatDateForDisplay = (value?: unknown) => {
  if (value === null || value === undefined) return "";

  const text = String(value).trim();
  if (!text) return "";

  if (isoDatePattern.test(text)) {
    const [year, month, day] = text.split("-");
    return `${day}/${month}/${year}`;
  }

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return text;

  const day = String(parsed.getDate()).padStart(2, "0");
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const year = parsed.getFullYear();
  return `${day}/${month}/${year}`;
};

const toIsoDate = (value: string) => {
  const match = value.trim().match(displayDatePattern);
  if (!match) return "";

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  if (!isValidDateParts(day, month, year)) return "";

  return `${match[3]}-${match[2]}-${match[1]}`;
};

const DatePickerField = ({
  id,
  value = "",
  onChange,
  disabled = false,
  className = "",
}: DatePickerFieldProps) => {
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [displayValue, setDisplayValue] = useState(
    formatDateForDisplay(value),
  );

  useEffect(() => {
    setDisplayValue(formatDateForDisplay(value));
  }, [value]);

  const openCalendar = () => {
    const input = dateInputRef.current;
    if (!input || disabled) return;

    input.showPicker?.();
    input.focus();
    input.click();
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setDisplayValue(nextValue);

    if (!nextValue.trim()) {
      onChange("");
      return;
    }

    const isoValue = toIsoDate(nextValue);
    if (isoValue) {
      onChange(isoValue);
    }
  };

  const handleTextBlur = () => {
    if (!displayValue.trim()) {
      setDisplayValue("");
      onChange("");
      return;
    }

    const isoValue = toIsoDate(displayValue);
    setDisplayValue(
      isoValue ? formatDateForDisplay(isoValue) : formatDateForDisplay(value),
    );
  };

  return (
    <div className="relative">
      <Input
        id={id}
        value={displayValue}
        onChange={handleTextChange}
        onBlur={handleTextBlur}
        disabled={disabled}
        className={`h-12 pr-12 text-base ${className}`}
        placeholder="dd/mm/yyyy"
        inputMode="numeric"
      />
      <button
        type="button"
        aria-label="Open calendar"
        onClick={openCalendar}
        disabled={disabled}
        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <HiOutlineCalendarDays size={20} />
      </button>
      <input
        ref={dateInputRef}
        type="date"
        value={isoDatePattern.test(value) ? value : ""}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2 opacity-0"
      />
    </div>
  );
};

export default DatePickerField;
