import React, { useState, useEffect } from 'react';
import CalendarUserInfo from './CalendarUserInfo';
import { IHoliday } from '../Holiday/HolidayApprovedRequests';
import { IHolidayRequest } from '../Admin/AdminModule';
import { IDates } from '../Holiday/HolidaySchedule';
import { Calendar, OnArgs } from 'react-calendar';
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

const CustomTileContent: React.FC<any> = ({ date, calendarNavigationMonth, hoveredDate, holidayDataProp, position }) => {
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
      return (
        <CalendarUserInfo
          holidayDataProp={holidayDataProp}
          calendarNavigationMonth={calendarNavigationMonth}
          position={position} 
        />
      );
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
  
          let gradientColors = '';
  
          item.color_hex.forEach((color, index) => {
              const startPercent = (index / item.color_hex.length) * 100;
              const endPercent = ((index + 1) / item.color_hex.length) * 100;
  
              gradientColors += `${color} ${startPercent.toFixed(0)}%, `;
              gradientColors += `${color} ${endPercent.toFixed(0)}%, `;
          });
  
          colorMap[dateKey] = gradientColors.slice(0, -2);
      }
    });
  
    if (overlappingHolidays) {
      const colorStops = Object.entries(colorMap)
      .map(([daterange, color], index) => {
        const startDate = daterange.slice(0, 10)
        const endDate = daterange.slice(11, 21)

        const date = `${startDate}-${endDate}`

        return `
          .react-calendar__tile--overlapping-${date} {
            background-image: linear-gradient(0deg, ${color});
          }
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
  }
`;

type ValuePiece = Date | string | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarHolder: React.FC<ICalendarHolder> = ({ holidayDataProp, backgroundColor }) => {
  const [value, setValue] = useState<Value>(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [mousePosition, setMousePosition] = useState<IPosition>({ x: 0, y: 0 });
  const [calendarNavigationMonth, setCalendarNavigationMonth] = useState<string>(new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`);

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleDateChange = (newValue: Value) => {
    setValue(newValue);
  };

  const handleActiveStartDateChange = ({ action, activeStartDate, value, view }: OnArgs) => {
    const currentDate = activeStartDate as Date
    const date = new Date(currentDate)
    const currentMonth = date.getMonth() + 1
    const fixedCurrentMonth = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`
    setCalendarNavigationMonth(fixedCurrentMonth);
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
            const startMonth = startDate.getMonth() + 1;
            const endMonth = startDate.getMonth() + 1
            const startPaddedMonth = startMonth < 10 ? `0${startMonth}` : startMonth.toString();
            const startPaddedDay = startDate.getDate() < 10 ? `0${startDate.getDate()}` : startDate.getDate().toString();
            const endPaddedMonth = endMonth < 10 ? `0${endMonth}` : endMonth.toString();
            const endPaddedDay = endDate.getDate() < 10 ? `0${endDate.getDate()}` : endDate.getDate().toString()
            return `react-calendar__tile--overlapping-${startDate.getFullYear()}-${startPaddedMonth}-${startPaddedDay}-${endDate.getFullYear()}-${endPaddedMonth}-${endPaddedDay}`;
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
        onActiveStartDateChange={handleActiveStartDateChange}
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
                  <CustomTileContent date={date} calendarNavigationMonth={calendarNavigationMonth} hoveredDate={hoveredDate} holidayDataProp={holidayDataProp} position={mousePosition} />
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