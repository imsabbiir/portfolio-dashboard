"use client";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({ tag, value, onChange, name }) {
  const handleChange = (newValue) => {
    onChange(name, newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={tag}
          value={value}
          onChange={handleChange}
          slotProps={{
            textField: {
              fullWidth: true,
              className:
                "subBoxBg subTitleText font-thin rounded px-4 outline-none py-2 mt-3",
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
