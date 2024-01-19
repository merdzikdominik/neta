import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import InteractiveBackground from './InteractiveBackground';
import styled from 'styled-components';

const CalendarContainer = styled.section`
  .react-calendar {
    width: 70%;
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

interface CalendarDate {
  id: number;
  dateFrom: string;
  dateTo: string;
}

const CalendarHolder: React.FC = () => {
  const [value, setValue] = useState<Value>(new Date());
  const [calendarDates, setCalendarDates] = useState<CalendarDate[]>([]);

  useEffect(() => {
    // Pobierz daty z API przy ładowaniu komponentu
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/all_dates');
      if (response.ok) {
        const data = await response.json();
        setCalendarDates(data);
      } else {
        console.error('Błąd podczas pobierania dat');
      }
    } catch (error) {
      console.error('Błąd podczas pobierania dat', error);
    }
  };

  const handleDateChange = (newValue: Value) => {
    setValue(newValue);
  };

  const isDateInRange = (date: Date) => {
    return calendarDates.some((item) => {
      const startDate = new Date(item.dateFrom);
      const endDate = new Date(item.dateTo);
      return date >= startDate && date <= endDate;
    });
  };

  const tileClassName = ({ date }: any) => {
    if (isDateInRange(date)) {
      return 'react-calendar__tile--custom';
    }
    return '';
  };

  return (
    <>
      <CalendarContainer>
        <Calendar
          onChange={handleDateChange}
          value={value}
          showNeighboringMonth={false}
          tileClassName={tileClassName}
        />
      </CalendarContainer>
      <InteractiveBackground />
    </>
  );
};

export default CalendarHolder;
