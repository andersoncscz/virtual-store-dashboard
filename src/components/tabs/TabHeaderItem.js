import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSelector, useDispatch } from 'react-redux';
import { Creators as TabActions } from '../../modules/ducks/tab';

const TabHeaderItem = ({ id, label, icon }) => {
    
    const dispatch = useDispatch()
    const { tabSelected } = useSelector(state => state.ui);
    const isActive = tabSelected === id
    
    const handleSelectTab = useCallback(() => {
        dispatch(TabActions.selectTab(id))
    },[dispatch, id])

    return (
        <a onClick={handleSelectTab} className={`nav-item nav-link ${isActive && 'active'}`} id={id} data-toggle="tab" href={`#/${label}`} role="tab" aria-controls="nav-home" aria-selected={isActive}>
            <span className="d-flex justify-content-between align-items-center">
                <FontAwesomeIcon icon={icon}/>
                <span className="pl-1 pr-1"> </span>
                {label}
            </span>
        </a>
    )
}

export default TabHeaderItem