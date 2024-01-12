import { Action } from 'redux';
import { Dispatch } from 'redux';

export type AppDispatch = Dispatch<Action>;

export const SET_DATES = 'SET_DATES';

export interface DateState {
    dateFrom: string;
    dateTo: string;
}

export interface RootState {
    dates: DateState;
}

export interface SetDateAction extends Action {
    type: 'SET_DATES';
    payload: DateState;
}
  
export type DateActionTypes = SetDateAction