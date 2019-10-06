import { combineReducers } from 'redux';

import user from './user';
import sidebar from './sidebar';
import upload from './upload';
import tab from './tab';
import form from './form';

const rootReducer = combineReducers({
    user,
    upload,
    form,
    ui: combineReducers({ 
        isSidebarOpened: sidebar,
        tabSelected: tab
    })
});

export default rootReducer;