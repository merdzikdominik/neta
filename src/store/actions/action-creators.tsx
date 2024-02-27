import { DateState, SetDateAction, SET_DATES } from '../types';

// export const setHolidayTypes = (holidayTypes: IHolidayTypes) => ({
//   type: SET_HOLIDAY_TYPES,
//   payload: holidayTypes,
// });

export const setDate = (dates: DateState): SetDateAction => ({
    type: SET_DATES,
    payload: dates,
});