import React, { useState } from 'react';
import { IDates } from '../Reports/HolidaySchedule';
import { IHoliday } from '../Holiday/HolidayApprovedRequests';
import { Calendar } from 'react-calendar';
import { isWithinInterval } from 'date-fns'
import { IRequestUser } from '../Admin/AdminModule';
import styled from 'styled-components';

interface ICalendarHolder {
  holidayDataProp?: IHolidayRequest[] | IHoliday[] | IDates[]
}

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
    color: #fff;
    background-color: #add8e6;
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

export interface IHolidayRequest{
  id: number;
  dateFrom: string;
  dateTo: string;
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
      const currentUser = holidayDataProp!.find((item): item is IHoliday => {
        return isWithinInterval(date, {
          start: new Date(item.dateFrom),
          end: new Date(item.dateTo)
        }) && 'user' in item;
      }) as IHoliday | undefined;
      
      if (currentUser && 'user' in currentUser) {
        return `react-calendar__tile--custom-${currentUser.user.email.replace(/[@.]/g, '')}`;
      }      
    }
    return '';
  };

  return (
    <CalendarContainer holidayDataProp={holidayDataProp}>
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

// import React, { useState, useEffect } from 'react';
// import { Calendar } from 'react-calendar';
// import { IHoliday } from '../Holiday/HolidayApprovedRequests';
// import { IDates } from '../Reports/HolidaySchedule';
// import { isWithinInterval } from 'date-fns';
// import styled, { createGlobalStyle } from 'styled-components';

// interface ICalendarHolder {
//   holidayDataProp?: IHolidayRequest[] | IHoliday[] | IDates[];
// }

// const GlobalStyles = createGlobalStyle<{ styles: string }>`
//   ${(props) => props.styles}
// `;

// const CalendarContainer = styled.div<ICalendarHolder>`
//   .react-calendar {
//     width: 100%;
//     margin: 20px auto auto;
//   }

//   .react-calendar__navigation {
//     display: flex;

//     .react-calendar__navigation__label {
//       font-weight: bold;
//     }

//     .react-calendar__navigation__arrow {
//       flex-grow: 0.333;
//     }
//   }

//   .react-calendar__month-view__weekdays {
//     text-align: center;
//     color: #fff;
//   }

//   .react-calendar__month-view__days {
//     display: grid !important;
//     grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

//     .react-calendar__tile {
//       max-width: initial !important;
//     }
//   }

//   .react-calendar__tile {
//     text-align: center;
//     line-height: 2;
//     pointer-events: none;
//     height: 40px;
//   }

//   .react-calendar__tile--custom {
//     color: #fff;
//     background-color: #add8e6;
//   }

//   .react-calendar__navigation__label {
//     pointer-events: none;
//   }

//   button {
//     margin: 3px;
//     background-color: #fff;
//     border: 0;
//     border-radius: 3px;
//     color: #000c66;
//     padding: 5px 0;

//     &:hover {
//       background-color: #75e6da;
//     }
//   }
// `;

// type ValuePiece = Date | string | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

// interface IUser {
//   email: string;
// }

// interface ICustomHoliday extends IHoliday {
//   // Dodaj inne pola według potrzeb
// }

// export interface IHolidayRequest {
//   id: number;
//   dateFrom: string;
//   dateTo: string;
//   // Dodaj inne pola według potrzeb
// }

// const isCustomHoliday = (item: IHoliday | IDates): item is ICustomHoliday => {
//   return 'user' in item;
// };

// const CalendarHolder: React.FC<ICalendarHolder> = ({ holidayDataProp }) => {
//   const [value, setValue] = useState<Value>(new Date());
//   const [styles, setStyles] = useState<string>('');

//   useEffect(() => {
//     if (holidayDataProp) {
//       const colors: Record<string, string> = {};
//       holidayDataProp.forEach((holiday) => {
//         if (isCustomHoliday(holiday)) {
//           const className = `react-calendar__tile--custom-${holiday.user.email.replace(/[@.]/g, '')}`;
//           colors[className] = holiday.color_hex;
//         }
//       });

//       const styles = Object.entries(colors).map(([className, color]) => `
//         .${className} {
//           background-color: ${color};
//         }
//       `).join('');

//       setStyles(styles);
//     }
//   }, [holidayDataProp]);

//   const handleDateChange = (newValue: Value) => {
//     setValue(newValue);
//   };

//   const isDateInRange = (date: Date) => {
//     return holidayDataProp!.some((item) => {
//       const startDate = new Date(item.dateFrom);
//       const endDate = new Date(item.dateTo);
//       const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

//       return +date === +startOfDay(startDate) || isWithinInterval(date, { start: startOfDay(startDate), end: endDate });
//     });
//   };

//   return (
//     <CalendarContainer>
//       <GlobalStyles styles={styles} />
//       <Calendar
//         onChange={handleDateChange}
//         value={value}
//         showNeighboringMonth={false}
//         tileClassName={({ date }: any) => {
//           if (isDateInRange(date)) {
//             const currentUser = holidayDataProp!.find(isCustomHoliday) as ICustomHoliday | undefined;

//             if (currentUser && 'user' in currentUser) {
//               return `react-calendar__tile--custom-${currentUser.user.email.replace(/[@.]/g, '')}`;
//             }
//           }
//           return '';
//         }}
//       />
//     </CalendarContainer>
//   );
// };

// export default CalendarHolder;