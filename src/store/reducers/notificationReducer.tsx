import { 
    FETCH_NOTIFICATIONS_SUCCESS, 
    FETCH_NOTIFICATIONS_FAILURE, 
    SEND_NOTIFICATION_SUCCESS,
    SEND_NOTIFICATION_FAILURE,
    CLEAR_NOTIFICATIONS,
    ActionTypes, 
    INotificationState
} from '../types';

const initialState: INotificationState[] = []

export const notificationsReducer = (state = initialState, action: ActionTypes): INotificationState[] => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_SUCCESS:
            const newNotifications = action.payload.filter(newNotification => 
                !state.some(existingNotification => existingNotification.id === newNotification.id)
            );

            return [...state, ...newNotifications];

        case FETCH_NOTIFICATIONS_FAILURE:
            console.error(action.error);
            return state;
        
        case SEND_NOTIFICATION_SUCCESS:

            return [...state, action.payload];

        case SEND_NOTIFICATION_FAILURE:
            console.error(action.error);
            return state;

        case CLEAR_NOTIFICATIONS: 
            return action.payload

        default:
            return state;
    }
};