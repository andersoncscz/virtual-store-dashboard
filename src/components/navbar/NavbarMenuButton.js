import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Creators as SidebarActions } from '../../modules/ducks/sidebar'

const NavbarMenuButton = props => {
    const { toggleSidebar } = SidebarActions;
    const { icon } = props;    
    const dispatch = useDispatch();

    const handleToggle = useCallback(
        () => dispatch(toggleSidebar()),
        [dispatch, toggleSidebar]
    );

    return (
        <button onClick={handleToggle} className="btn btn-default shadow-none text-primary"> 
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}

export default NavbarMenuButton;