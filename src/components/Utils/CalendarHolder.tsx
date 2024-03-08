import React, { useState, useEffect } from 'react';
import { IDates } from '../Reports/HolidaySchedule';
import { IHoliday } from '../Holiday/HolidayApprovedRequests';
import { Calendar } from 'react-calendar';
import { isWithinInterval } from 'date-fns';
import styled from 'styled-components';

interface ICalendarHolder {
  holidayDataProp?: IHolidayRequest[] | IHoliday[] | IDates[];
}

interface IHoverInfo {
  position: { x: number; y: number };
}

export interface IHolidayRequest {
  id: number;
  dateFrom: string;
  dateTo: string;
}

interface IPosition {
  x: number;
  y: number;
}

const HoverText: React.FC<IHoverInfo> = ({ position }) => {
  return (
    <div style={{ position: 'absolute', top: position.y, left: position.x }}>
      Hovering right meow!
      <span role="img" aria-label="cat">
        🐱
      </span>
    </div>
  );
};

const CustomTileContent: React.FC<any> = ({ date, hoveredDate, holidayDataProp, position }) => {
  if (hoveredDate && isWithinInterval(hoveredDate, { start: date, end: date })) {
    const currentUser = holidayDataProp!.find((item: IHoliday) => {
      return (
        isWithinInterval(date, {
          start: new Date(item.dateFrom),
          end: new Date(item.dateTo),
        }) && 'user' in item
      );
    }) as IHoliday | undefined;

    if (currentUser && 'user' in currentUser) {
      return <p style={{ position: 'absolute', top: position.y, left: position.x }}>{`User: ${currentUser.user.first_name}, Email: ${currentUser.user.email}`}</p>;
    }
  }
  return null;
};


const CalendarContainer = styled.div<ICalendarHolder>`
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
    pointer-events: none;
  }
  
  .react-calendar__tile--custom:hover {
    background-color: #75e6da;
  }
  
  .react-calendar__tile--custom.react-calendar__tile--custom-colored {
    pointer-events: all; 
  }

  .custom-tile {
    height: 100%;
    width: 100%;
    pointer-events: all; /* Ustawienie zdarzeń myszy na aktywne */
  }

  ${(props: { holidayDataProp?: (IHolidayRequest | IHoliday | IDates)[] }) =>
    props.holidayDataProp &&
    props.holidayDataProp.map(holiday => {
      if ('user' in holiday && holiday.user) {
        return `
          .react-calendar__tile--custom-${(holiday as IHoliday).user.email.replace(/[@.]/g, '')} {
            background-color: ${(holiday as IHoliday).color_hex};
          }
        `;
      }
      return '';
    }).join('')}


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

const CalendarHolder: React.FC<ICalendarHolder> = ({ holidayDataProp }) => {
  const [value, setValue] = useState<Value>(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [mousePosition, setMousePosition] = useState<IPosition>({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

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
      const currentUser = holidayDataProp!.find((item): item is IHoliday => {
        return (
          isWithinInterval(date, {
            start: new Date(item.dateFrom),
            end: new Date(item.dateTo),
          }) && 'user' in item
        );
      }) as IHoliday | undefined;

      if (currentUser && 'user' in currentUser) {
        return `react-calendar__tile--custom react-calendar__tile--custom-${currentUser.user.email.replace(
          /[@.]/g,
          ''
        )}`;
      }
    }
    return '';
  };

  const handleOnMouseOver = (date: Date) => {
    setHoveredDate(date);
  };

  const handleOnMouseOut = () => {
    setHoveredDate(null);
  };

  useEffect(() => {
    if (hoveredDate) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredDate]);

  useEffect(() => {
    console.log(hoveredDate)
  }, [hoveredDate])

  return (
    <CalendarContainer holidayDataProp={holidayDataProp}>
      <Calendar
        onChange={handleDateChange}
        value={value}
        showNeighboringMonth={false}
        tileClassName={tileClassName}
        tileContent={({ activeStartDate, date, view }: any) => {
          if (view === 'month') {
            const classes = isDateInRange(date) ? 'custom-tile custom-tile-colored' : 'custom-tile';
            return (
              <div
                className={classes}
                onMouseOver={() => handleOnMouseOver(date)}
                onMouseOut={handleOnMouseOut}
              >
                {hoveredDate && hoveredDate.getTime() === date.getTime() && (
                  <CustomTileContent date={date} hoveredDate={hoveredDate} holidayDataProp={holidayDataProp} position={mousePosition} />
                )}
              </div>
            );
          }
        }}
      />
    </CalendarContainer>
  );
};

export default CalendarHolder;