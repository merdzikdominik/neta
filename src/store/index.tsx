import { legacy_createStore as createStore, combineReducers, applyMiddleware, Reducer } from 'redux';
import { thunk } from 'redux-thunk';
import { RootState } from './types';
import { dateReducer } from './reducers/datesReducer';
import { notificationsReducer } from './reducers/notificationReducer';

const initialState: RootState = {
  dates: { dateFrom: '', dateTo: '' },
  notifications: []
};

const rootReducer: Reducer = combineReducers({
  dates: dateReducer,
  notifications: notificationsReducer,
});

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
