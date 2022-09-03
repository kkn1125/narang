import { Badge, Box, styled, TextField } from "@mui/material";
import {
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { endOfWeek, isSameDay, isWithinInterval, startOfWeek } from "date-fns";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserProvider";

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
};

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
  const [user, dispatch] = useContext(UserContext);
  const [badge, setBadge] = useState(false);
  const [value, setValue] = useState<Date | null>(new Date());
  const [viewDate, setViewDate] = useState<Date | null>(new Date());

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
    const start = startOfWeek(value);
    const end = endOfWeek(value);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    const isSame = userEmotions.find((emotion) => {
      const emoTime = new Date(emotion.regdate);
      const curTime = new Date(date);
      if (
        emoTime.getFullYear() === curTime.getFullYear() &&
        emoTime.getMonth() === curTime.getMonth() &&
        emoTime.getDate() === curTime.getDate() &&
        user.id === emotion.uid
      ) {
        return true;
      }
      return false;
    });

    return (
      <Badge
        key={date.toString()}
        overlap='circular'
        badgeContent={
          isSame && viewDate.getMonth() === new Date(isSame.regdate).getMonth()
            ? isSame.emoji
            : ""
        }>
        <CustomPickersDay
          {...pickersDayProps}
          disableMargin
          dayIsBetween={dayIsBetween}
          isFirstDay={isFirstDay}
          isLastDay={isLastDay}
        />
      </Badge>
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
          onMonthChange={(month) => {
            setViewDate(month);
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
