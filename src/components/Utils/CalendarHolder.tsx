import React, { useState, useEffect } from 'react';
import CalendarUserInfo from './CalendarUserInfo';
import { IHoliday } from '../Holiday/HolidayApprovedRequests';
import { IHolidayRequest } from '../Admin/AdminModule';
import { IDates } from '../Reports/HolidaySchedule';
import { Calendar } from 'react-calendar';
import { isWithinInterval, startOfDay } from 'date-fns';
import styled from 'styled-components';

interface ICalendarHolder {
  holidayDataProp?: (IHolidayRequest | IDates | IHoliday)[];
  backgroundColor?: string;
}

interface IPosition {
  x: number;
  y: number;
}

const CustomTileContent: React.FC<any> = ({ date, hoveredDate, holidayDataProp, position }) => {
  if (hoveredDate && isWithinInterval(hoveredDate, { start: date, end: date })) {
    const currentUser = holidayDataProp!.find((item: IHoliday) => {
      return (
        isWithinInterval(date, {
          start: startOfDay(new Date(item.dateFrom)),
          end: startOfDay(new Date(item.dateTo)),
        }) && 'user' in item
      );
    }) as IHoliday | undefined;
    
    if (currentUser && 'user' in currentUser) {
      const firstUser = currentUser.user[0];
      return <CalendarUserInfo firstName={firstUser.first_name} lastName={firstUser.last_name} email={firstUser.email} position={position} />;
    }
  }
  return null;
};

const CalendarContainer = styled.div<ICalendarHolder>`
  .react-calendar {
    width: 100%;
    margin: 20px auto auto;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : '#fafafa'};
    padding: 20px;
    border-radius: 10px;
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
  }

  .react-calendar__tile {
    text-align: center;
    line-height: 2;
    pointer-events: none;
    height: 60px;
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
    pointer-events: all; 
  }

  ${(props) => {
    const holidays: IHoliday[] | undefined = props.holidayDataProp?.filter(
      (item) => 'dateFrom' in item
    ) as IHoliday[];

    if (holidays && holidays.length > 0) {
      return holidays
        .map((holiday) => {
          if ('user' in holiday && holiday.user && holiday.user.length > 0) {
            const users = holiday.user;
            const firstUser = users[0];

            return `
              .react-calendar__tile--custom.react-calendar__tile--custom-${firstUser.email.replace(
                /[@.]/g,
                ''
              )} {
                background-color: ${holiday.color_hex};
              }
            `;
          }
          return '';
        })
        .join('');
    }
    return '';
  }}

  ${(props) => {
    const colorMap: { [key: string]: string } = {};

    const overlappingHolidays = props.holidayDataProp?.filter((item) => {
      return (
        'dateFrom' in item &&
        'dateTo' in item &&
        'color_hex' in item &&
        Array.isArray(item.color_hex)
      );
    }) as IHoliday[] | undefined;

    overlappingHolidays?.forEach(item => {
      if (Array.isArray(item.color_hex)) {
          const dateKey = `${item.dateFrom}-${item.dateTo}`;
          const numberOfColors = item.color_hex.length;
          const percentStep = 100 / numberOfColors;
  
          let gradientColors = '';
  
          item.color_hex.forEach((color, index) => {
              const startPercent = index * percentStep;
              const endPercent = (index + 1) * percentStep;
  
              gradientColors += `${color} ${startPercent.toFixed(2)}%, `;
              gradientColors += `${color} ${endPercent.toFixed(2)}%`;
  
              if (index !== numberOfColors - 1) {
                  gradientColors += ', ';
              }
          });
  
          colorMap[dateKey] = gradientColors;
      }
  });
  
    if (overlappingHolidays) {
      const colorStops = Object.entries(colorMap)
      .map(([daterange, color], index) => {
        const startDate = daterange.slice(0, 10)
        const gradients = `${color} ${(index) * (100 / [color].length + 1)}%, ${color} ${(index + 1) * (100 / [color].length + 1)}%`        

        return `
          .react-calendar__tile--overlapping-${startDate} {
            background-image: linear-gradient(0deg, ${gradients})
          };
        `;
      })
      .join('\n');

      return colorStops
    }
  
    return '';
  }}
  

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

const CalendarHolder: React.FC<ICalendarHolder> = ({ holidayDataProp, backgroundColor }) => {
  const [value, setValue] = useState<Value>(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [mousePosition, setMousePosition] = useState<IPosition>({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleDateChange = (newValue: Value) => {
    setValue(newValue);
  };

  const tileClassName = ({ date }: any) => {
    const holidayDataPropForOverlapping = holidayDataProp;
    const overlappingHolidays = holidayDataPropForOverlapping?.filter((item) => {
      return (
        'dateFrom' in item &&
        'dateTo' in item &&
        'color_hex' in item &&
        Array.isArray(item.color_hex)
      );
    }) as IHoliday[] | undefined;
  
    const classNames: string[] = [];
  
    if (overlappingHolidays) {
      overlappingHolidays.forEach((holiday) => {
        const startDate = startOfDay(new Date(holiday.dateFrom));
        const endDate = startOfDay(new Date(holiday.dateTo));
  
        if (isWithinInterval(date, { start: startDate, end: endDate })) {
          const colorClass = (holiday.color_hex as string[]).map((color: string) => {
            const month = startDate.getMonth() + 1;
            const paddedMonth = month < 10 ? `0${month}` : month.toString();
            const paddedDay = startDate.getDate() < 10 ? `0${startDate.getDate()}` : startDate.getDate().toString();
            return `react-calendar__tile--overlapping-${startDate.getFullYear()}-${paddedMonth}-${paddedDay}`;
          });
  
          classNames.push(...colorClass);
        }
      });
    }
  
    const holidays: IHoliday[] | undefined = holidayDataProp?.filter(
      (item) => 'dateFrom' in item && 'dateTo' in item
    ) as IHoliday[];
  
    if (holidays && holidays.length > 0) {
      const currentUser = holidays.find((item) => {
        return (
          isWithinInterval(date, {
            start: startOfDay(new Date(item.dateFrom)),
            end: startOfDay(new Date(item.dateTo)),
          }) &&
          'user' in item
        );
      });
  
      if (currentUser && 'user' in currentUser) {
        const firstUser = currentUser.user[0];
        classNames.push(`react-calendar__tile--custom react-calendar__tile--custom-${firstUser.email.replace(/[@.]/g, '')}`);
      }
    }
  
    return classNames.join(' ');
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

  return (
    <CalendarContainer holidayDataProp={holidayDataProp}  backgroundColor={backgroundColor}>
      <Calendar
        onChange={handleDateChange}
        value={value}
        showNeighboringMonth={false}
        tileClassName={tileClassName}
        tileContent={({ activeStartDate, date, view }: any) => {
          if (view === 'month') {
            return (
              <>
                <div
                  style={{ height: "100%", width: "100%", position: 'relative', top: '-28px', pointerEvents: 'all' }}
                  onMouseOver={() => handleOnMouseOver(date)}
                  onMouseOut={handleOnMouseOut}
                ></div>
                {hoveredDate && hoveredDate.getTime() === date.getTime() && (
                  <CustomTileContent date={date} hoveredDate={hoveredDate} holidayDataProp={holidayDataProp} position={mousePosition} />
                )}
              </>
            );
          }
        }}
      />
    </CalendarContainer>
  );
};

export default CalendarHolder;
