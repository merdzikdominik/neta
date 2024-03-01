import { Action } from 'redux';
import { Dispatch } from 'redux';

export type AppDispatch = Dispatch<Action>;

export const SET_DATES = 'SET_DATES'
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS'

export const FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS';
export const FETCH_NOTIFICATIONS_FAILURE = 'FETCH_NOTIFICATIONS_FAILURE';

export const SEND_NOTIFICATION_SUCCESS = 'SEND_NOTIFICATION_SUCCESS'
export const SEND_NOTIFICATION_FAILURE = 'SEND_NOTIFICATION_FAILURE'

export interface IDateState {
    dateFrom: string;
    dateTo: string;
}

export interface INotificationState {
    id: number,
    label: string
}

export interface RootState {
    dates: IDateState,
    notifications: INotificationState[]
}

export interface ISendNotificationSuccessAction {
    type: typeof SEND_NOTIFICATION_SUCCESS;
    payload: INotificationState;
}

export interface ISendNotificationFailureAction {
    type: typeof SEND_NOTIFICATION_FAILURE;
    payload: string;
}

export interface IFetchRequestsSuccessAction {
    type: typeof FETCH_NOTIFICATIONS_SUCCESS;
    payload: INotificationState[];
}

export interface IFetchRequestsFailureAction {
    type: typeof FETCH_NOTIFICATIONS_FAILURE;
    error: string;
}

export interface SetDateAction extends Action {
    type: 'SET_DATES';
    payload: IDateState;
}

export interface SetNotificationAction extends Action {
    type: 'ADD_NOTIFICATION'
    payload: INotificationState
}

export type DateActionTypes = SetDateAction

export type ActionTypes = ISendNotificationSuccessAction | IFetchRequestsFailureAction | IFetchRequestsSuccessAction | IFetchRequestsFailureAction