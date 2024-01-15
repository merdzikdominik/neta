import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { isWithinInterval } from 'date-fns'
import { RootState } from '../../store/types'
import Calendar from 'react-calendar'
import InteractiveBackground from './InteractiveBackground'
import styled from 'styled-components'

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
    background-color: #ADD8E6;
}

.react-calendar__navigation__label {
    pointer-events: none;
}

button {
    margin: 3px;
    background-color: #fff;
    border: 0;
    border-radius: 3px;
    color: #000C66;
    padding: 5px 0;

    &:hover {
        background-color: #75E6DA;
    }
}
`

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarHolder: React.FC = () => {
    const { dateFrom, dateTo } = useSelector((state: RootState) => state.dates)
    const [value, setValue] = useState<Value>(new Date())

    const handleDateChange = (newValue: Value) => {
      setValue(newValue);
    };

    const isDateInRange = (date: Date, startDate: Date, endDate: Date) => {
        const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
        return +date === +startOfDay(startDate) || isWithinInterval(date, { start: startOfDay(startDate), end: endDate });
    };
  
    const tileClassName = ({ date }: any) => {
        const startDate = new Date(dateFrom)
        const endDate = new Date(dateTo)

        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            if (isDateInRange(date, startDate, endDate)) {
              return 'react-calendar__tile--custom';
            }
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

export default CalendarHolder