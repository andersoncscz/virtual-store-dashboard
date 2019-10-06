import React from 'react';
import { useSelector } from 'react-redux';

const TabContentItem = ({ children, id, tabId }) => {

    const { tabSelected } = useSelector(state => state.ui);
    const isActive = tabSelected === tabId

    return (
        <div className={`tab-pane fade ${isActive && 'show active'}`} id={id} role="tabpanel" aria-labelledby={tabId}>
            {children}
        </div>
    )
}

export default TabContentItem