import React, { useState, useEffect } from 'react';
import { IDates } from '../Reports/HolidaySchedule';
import { IHoliday } from '../Holiday/HolidayApprovedRequests';
import { Calendar } from 'react-calendar';
import { isWithinInterval } from 'date-fns'
import styled from 'styled-components';

const CalendarContainer = styled.div`
  .react-calendar {
    width: 100%;
    margin: 20px auto auto;
  }

  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    color: #fff;
  }

  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

    .react-calendar__tile {
      max-width: initial !important;
    }
  }

  .react-calendar__tile {
    text-align: center;
    line-height: 2;
    pointer-events: none;
    height: 40px;
  }

  .react-calendar__tile--custom {
    color: #fff;
    background-color: #add8e6;
  }

  .react-calendar__navigation__label {
    pointer-events: none;
  }

  button {
    margin: 3px;
    background-color: #fff;
    border: 0;
    border-radius: 3px;
    color: #000c66;
    padding: 5px 0;

    &:hover {
      background-color: #75e6da;
    }
  }
`;

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface IHolidayRequest{
  id: number;
  dateFrom: string;
  dateTo: string;
}

interface ICalendarHolder {
  holidayDataProp?: IHolidayRequest[] | IHoliday[] | IDates[]
}

const CalendarHolder: React.FC<ICalendarHolder> = ({ holidayDataProp }) => {
  const [value, setValue] = useState<Value>(new Date());

  const handleDateChange = (newValue: Value) => {
    setValue(newValue);
  };

  const isDateInRange = (date: Date) => {
    return holidayDataProp!.some((item) => {
      const startDate = new Date(item.dateFrom);
      const endDate = new Date(item.dateTo);
      const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
      
      return +date === +startOfDay(startDate) || isWithinInterval(date, { start: startOfDay(startDate), end: endDate });
    });
  };

  const tileClassName = ({ date }: any) => {
    if (isDateInRange(date)) {
      return 'react-calendar__tile--custom';
    }
    return '';
  };

  return (
    <CalendarContainer>
      <Calendar
        onChange={handleDateChange}
        value={value}
        showNeighboringMonth={false}
        tileClassName={tileClassName}
      />
    </CalendarContainer>
  );
};

export default CalendarHolder;
