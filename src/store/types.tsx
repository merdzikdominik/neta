import { Action } from 'redux';
import { Dispatch } from 'redux';

export type AppDispatch = Dispatch<Action>;

export const SET_DATES = 'SET_DATES'

export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS'
export const FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS';
export const FETCH_NOTIFICATIONS_FAILURE = 'FETCH_NOTIFICATIONS_FAILURE';

export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS'

export const SEND_NOTIFICATION_SUCCESS = 'SEND_NOTIFICATION_SUCCESS'
export const SEND_NOTIFICATION_FAILURE = 'SEND_NOTIFICATION_FAILURE'

export interface IDateState {
    dateFrom: string;
    dateTo: string;
}

export interface INotification {
    id: string,
    label: string
}

export interface RootState {
    dates: IDateState
}

export interface ISendNotificationSuccessAction {
    type: typeof SEND_NOTIFICATION_SUCCESS;
    payload: INotification;
}

export interface ISendNotificationFailureAction {
    type: typeof SEND_NOTIFICATION_FAILURE;
    error: string;
}

export interface IFetchNotificationsSuccessAction {
    type: typeof FETCH_NOTIFICATIONS_SUCCESS;
    payload: INotification[];
}

export interface IFetchNotificationsFailureAction {
    type: typeof FETCH_NOTIFICATIONS_FAILURE;
    error: string;
}

export interface IClearNotificationsAction {
    type: typeof CLEAR_NOTIFICATIONS
    payload: []
}

export interface SetDateAction extends Action {
    type: 'SET_DATES';
    payload: IDateState;
}

export type DateActionTypes = SetDateAction

export type ActionTypes = ISendNotificationSuccessAction | ISendNotificationFailureAction | IFetchNotificationsFailureAction | IFetchNotificationsSuccessAction | IClearNotificationsAction