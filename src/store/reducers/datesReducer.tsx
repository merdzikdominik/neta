// reducers.ts
interface DateState {
    dateFrom: string;
    dateTo: string;
}
  
const initialDateState: DateState = {
    dateFrom: '',
    dateTo: '',
};
  
export const dateReducer = (state = initialDateState, action: any) => {
    switch (action.type) {
        case 'SET_DATES':
            const newState = {
                ...state,
                dateFrom: action.payload.dateFrom,
                dateTo: action.payload.dateTo,
            }

            return newState
            
        default:
            return state;
    }
};  