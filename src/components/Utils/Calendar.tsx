import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
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

.react-calendar__navigation__label {
    pointer-events: none;
}

button {
    margin: 3px;
    background-color: #fff;
    border: 0;
    border-radius: 3px;
    color: blue;
    padding: 5px 0;

    &:hover {
        background-color: #556b55;
    }
}

.react-calendar__tile--custom {
    background-color: red;
}

`

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarHolder: React.FC = () => {
    const [value, setValue] = useState<Value>(new Date());

    useEffect(() => {
        const formattedDate = format(value as Date, 'dd.MM.yyyy')
        setValue(formattedDate)

        console.log(value)
    }, [])

    const handleDateChange = (newValue: Value) => {
        // it will format the date clicked on the particular day
        const formattedDate = format(value as Date, 'dd.MM.yyyy')
        setValue(formattedDate)
        // console.log(format(newValue as Date, 'dd.MM.yyyy'))
    }

    const tileClassName = ({ date, view }: any) => {
        if (date.toISOString().split('T')[0] === '10.01.2024') {
          return '.react-calendar__tile--custom'
        }
        return ''
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
    )
}

export default CalendarHolder