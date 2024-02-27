import { Action } from 'redux';
import { Dispatch } from 'redux';

export type AppDispatch = Dispatch<Action>;

export const SET_DATES = 'SET_DATES';

// export const SET_HOLIDAY_TYPES = 'SET_HOLIDAY_TYPES';

export interface DateState {
    dateFrom: string;
    dateTo: string;
}

// export interface IHolidayTypes {
//     id: string
//     label: string
// }

export interface RootState {
    dates: DateState
    // holidayTypes: IHolidayTypes
}

export interface SetDateAction extends Action {
    type: 'SET_DATES';
    payload: DateState;
}

// export interface SetHolidayTypesAction extends Action {
//     type: 'SET_HOLIDAY_TYPES'
//     payload: IHolidayTypes
// }
  
export type DateActionTypes = SetDateAction