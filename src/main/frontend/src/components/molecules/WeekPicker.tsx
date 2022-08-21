import { Box, styled, TextField } from "@mui/material";
import {
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { endOfWeek, isSameDay, isWithinInterval, startOfWeek } from "date-fns";
import React, { Dispatch, useEffect, useState } from "react";

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
};

type setStartEndDayProps = {
  start: Date;
  end: Date;
}|null;

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
})) as React.ComponentType<CustomPickerDayProps>;

function WeekPicker({
  setStartEndDay,
}: {
  setStartEndDay: Dispatch<any>;
}) {
  const [value, setValue] = React.useState<Date | null>(new Date());
  useEffect(() => {
    const start = startOfWeek(value);
    const end = endOfWeek(value);
    // console.log(`start: ${start}, end: ${end}`);
    setStartEndDay({
      start, end
    })
  }, []);
  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>,
  ) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }
    // console.log(`date: ${date}`); // 해당월의 1일 부터 말일까지
    // console.log(`selectedDates: ${selectedDates}`); // 선택한 날짜

    const start = startOfWeek(value);
    const end = endOfWeek(value);
    // console.log(`value: `, value);
    // console.log(
    //   `시작: ${start.getMonth()}/${start.getDate()}, 끝: ${end.getMonth()}/${end.getDate()}`,
    // );
    // console.log(`start: `, start); // Sun Aug 14 2022 00:00:00 GMT+0900 (한국 표준시)

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <Box sx={{ mt: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs='desktop'
          label='Week picker'
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            // console.log(`newValue: ${newValue}`); // newValue: Mon Aug 22 2022 20:58:44 GMT+0900 (한국 표준시)
            const start = startOfWeek(newValue);
            const end = endOfWeek(newValue);
            // console.log(`newStart: ${start}, newEnd: ${end}`);
            setStartEndDay({
              start, end
            })
          }}
          renderDay={renderWeekPickerDay}
          renderInput={(params) => <TextField {...params} />}
          inputFormat="'Week of' MMM d"
        />
      </LocalizationProvider>
    </Box>
  );
}

export default WeekPicker;
