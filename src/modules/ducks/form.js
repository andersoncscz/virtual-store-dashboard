export const Types = {
    PUSH_FORM_DATA: "PUSH_FORM_DATA",
    CLEAN_FORM_DATA: "CLEAN_FORM_DATA",    
}


const INITIAL_STATE = null


export default function formReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.PUSH_FORM_DATA: 
        return {
            ...state,
            ...action.payload
        };        
        case Types.CLEAN_FORM_DATA:
            return INITIAL_STATE
        default:
            return state;
    }
}


export const Creators = {
    
    cleanFormData: () => ({ 
        type: Types.CLEAN_FORM_DATA,
    }),

    pushFormData: (data) => ({
        type: Types.PUSH_FORM_DATA,
        payload: {
            ...data
        }
    }),    
       
}