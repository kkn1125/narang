import { Badge, Box, styled, TextField } from "@mui/material";
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
} | null;

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})<CustomPickerDayProps>(
  ({ theme, dayIsBetween, isFirstDay, isLastDay, sx }) => ({
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
    sx,
  }),
) as React.ComponentType<CustomPickerDayProps>;

function WeekPicker({
  setStartEndDay,
  userEmotions,
}: {
  setStartEndDay: Dispatch<any>;
  userEmotions: any[];
}) {
  const [badge, setBadge] = useState(false);
  const [value, setValue] = React.useState<Date | null>(new Date());
  useEffect(() => {
    const start = startOfWeek(value);
    const end = endOfWeek(value);
    setStartEndDay({
      start,
      end,
    });
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

    // if (userEmotions) {
    //   userEmotions.forEach((emotions) => {
    //     const getDate = new Date(emotions.regdate);
    //     const isYearSame = getDate.getFullYear() === date.getFullYear();
    //     const isMonthSame = getDate.getMonth() === date.getMonth();
    //     const isDateSame = getDate.getDate() === date.getDate();
    //     if (isYearSame && isMonthSame && isDateSame) {
    //       setBadge(true);
    //     } else {
    //       setBadge(false);
    //     }
    //   });
    // }

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
            const start = startOfWeek(newValue);
            const end = endOfWeek(newValue);
            setStartEndDay({
              start,
              end,
            });
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
