import { legacy_createStore as createStore, combineReducers } from 'redux';
import { dateReducer } from './reducers/datesReducer';
// import { holidayTypesReducer } from './reducers/holidayTypesReducer'

const rootReducer = combineReducers({
  dates: dateReducer,
  // holidayTypes: holidayTypesReducer
});

export const store = createStore(rootReducer);