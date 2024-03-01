import { Action, Dispatch } from 'redux';
import { 
    IDateState, 
    INotificationState, 
    SetDateAction, 
    SET_DATES, 
    FETCH_NOTIFICATIONS_SUCCESS, 
    FETCH_NOTIFICATIONS_FAILURE,
    SEND_NOTIFICATION_SUCCESS,
    SEND_NOTIFICATION_FAILURE
} from '../types';

export const fetchNotificationsSuccess = (payload: INotificationState[]) => ({
    type: FETCH_NOTIFICATIONS_SUCCESS,
    payload,
});

export const fetchNotificationsFailure = (error: string) => ({
    type: FETCH_NOTIFICATIONS_FAILURE,
    error,
});

export const sendNotificationSuccess = (payload: INotificationState) => ({
    type: SEND_NOTIFICATION_SUCCESS,
    payload
})

export const sendNotificationFailure = (error: string) => ({
    type: SEND_NOTIFICATION_FAILURE,
    error
})

export const setDate = (dates: IDateState): SetDateAction => ({
    type: SET_DATES,
    payload: dates,
});

export const fetchNotifications = () => async (dispatch: Dispatch<Action>) => {
    const token = localStorage.getItem('authToken');

    if (token) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/all_notifications', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(fetchNotificationsSuccess(data));
            } else {
                const error = 'Błąd podczas pobierania powiadomień';
                dispatch(fetchNotificationsFailure(error));
            }
        } catch (error) {
            const errorMessage = `Błąd podczas pobierania powiadomień: ${error}`;
            dispatch(fetchNotificationsFailure(errorMessage));
        }
    }
};

export const sendNotifications = async (data: INotificationState, dispatch: Dispatch) => {
    const token = localStorage.getItem('authToken');

    if (token) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/all_notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                dispatch(sendNotificationSuccess(data));
            } else {
                console.error('Nie wysłano notyfikacji');

                dispatch(sendNotificationFailure('Nie udało się wysłać notyfikacji'));
            }

        } catch (error) {
            console.error(error);

            dispatch(sendNotificationFailure(`Błąd podczas wysyłania notyfikacji: ${error}`));
        }
    }
};