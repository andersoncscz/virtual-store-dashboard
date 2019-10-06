export const Types = {
    TAB_SELECTED: 'TAB_SELECTED'
};

const INITIAL_STATE = 'save-tab-header'

export default function tabReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.TAB_SELECTED:
            return action.payload.tabSelected
        default:
            return state;
    }
}


export const Creators = {
    selectTab: (tabSelected) => ({ 
        type: Types.TAB_SELECTED,
        payload: {
            tabSelected
        }
    })
}