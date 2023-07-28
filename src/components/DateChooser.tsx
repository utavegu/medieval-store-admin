import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // TODO: вопреки документации по умолчанию не импортится, и вообще разберись как не тащить всю либу, а только отдельные компоненты брать

const DateChooser = () => {
  const [value, setValue] = useState(null);
  console.log(value);

  /*
  Пока побаловался только с датами, но и трюки со временем тоже нужно будет освоить, для показа баннеров пригодятся
  Реализовать средствами дэйт-фнса
  const lastMonday = dayjs().startOf('week');
  const nextSunday = dayjs().endOf('week').startOf('day');

  const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
  };
  */
  return (
    <DatePicker
      label="Выберите начальную дату"
      value={value}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onChange={(newValue) => setValue(newValue)}
      disabled={false}
      // minDate={new Date()}
      disablePast // Вот ещё классная опция
      // shouldDisableDate={isWeekend} // Отключить конкретные даты
    />
  );
};

export default DateChooser;
