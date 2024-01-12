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
            const dateFrom = action.payload.dateFrom
            const dateTo = action.payload.dateTo

            let newState = {
                dateFrom: '',
                dateTo: ''
            }

            if (!state.dateFrom || dateFrom < state.dateFrom) {
                newState = {
                    ...state,
                    dateFrom,
                    dateTo: ''
                }
            }
        
            if (dateFrom <= dateTo) {
                newState = {
                    ...state,
                    dateFrom,
                    dateTo
                }
            }

            return newState

        default:
            return state
    }
};  