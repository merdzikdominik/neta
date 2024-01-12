import { DateState, SetDateAction, SET_DATES } from '../types';

export const setDate = (dates: DateState): SetDateAction => ({
    type: SET_DATES,
    payload: dates,
});