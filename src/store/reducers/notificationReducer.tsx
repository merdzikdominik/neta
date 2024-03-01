import { 
    FETCH_NOTIFICATIONS_SUCCESS, 
    FETCH_NOTIFICATIONS_FAILURE, 
    SEND_NOTIFICATION_SUCCESS,
    SEND_NOTIFICATION_FAILURE,
    ActionTypes, 
    INotificationState
} from '../types';

const initialState: INotificationState[] = []

export const notificationsReducer = (state = initialState, action: ActionTypes): INotificationState[] => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_SUCCESS:
            return [...state, ...action.payload];

        case FETCH_NOTIFICATIONS_FAILURE:
            console.error(action.error);
            return state;
        
        case SEND_NOTIFICATION_SUCCESS:
            let newId = state.length + 1;

            const newPayload: INotificationState = {
                ...action.payload,
                id: newId,
            }

            return [...state, newPayload];

        default:
            return state;
    }
};