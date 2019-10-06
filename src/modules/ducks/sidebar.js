export const Types = {
    TOGGLE: 'TOGGLE'
};

const INITIAL_STATE = false
export default function sidebarReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.TOGGLE:
            return !state;
        default:
            return state;
    }
}


export const Creators = {
    toggleSidebar: () => ({ type: Types.TOGGLE })
}