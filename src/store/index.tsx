import { legacy_createStore as createStore, combineReducers } from 'redux';
import { dateReducer } from './reducers/datesReducer';

const rootReducer = combineReducers({
  dates: dateReducer,
});

export const store = createStore(rootReducer);