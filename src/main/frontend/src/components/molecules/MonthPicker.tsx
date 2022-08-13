import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";

function MonthPicker() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={["year", "month"]}
        label='Year and Month'
        minDate={new Date("2022-01-01")}
        maxDate={new Date("2033-01-01")}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          console.log(
            `선택 연/월: ${newValue.getFullYear()}/${newValue.getMonth()}`,
          );
        }}
        renderInput={(params) => <TextField {...params} helperText={null} />}
      />
    </LocalizationProvider>
  );
}

export default MonthPicker;
