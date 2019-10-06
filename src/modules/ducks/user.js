export const Types = {
    SIGNIN_SUCCESS: "SIGNIN_SUCCESS",
    SIGNOUT: "SIGNOUT",
};

const INITIAL_STATE = null

export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.SIGNIN_SUCCESS: 
            const { email, displayName, photoURL, token } = action.payload.user
            return {
                ...state, 
                email, 
                displayName, 
                photoURL, 
                token
            };
        case Types.SIGNOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export const Creators = {    
    signInSuccess: user => ({
        type: Types.SIGNIN_SUCCESS,
        payload: {
            user
        }
    }),
    
    signOut: () => ({ 
        type: Types.SIGNOUT,
    }),
}