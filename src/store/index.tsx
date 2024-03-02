import { legacy_createStore as createStore, combineReducers, Reducer } from 'redux';
import { RootState } from './types';
import { dateReducer } from './reducers/datesReducer';

const initialState: RootState = {
  dates: { dateFrom: '', dateTo: '' }
};

const rootReducer: Reducer = combineReducers({
  dates: dateReducer,
});

const store = createStore(rootReducer, initialState);

export default store;
