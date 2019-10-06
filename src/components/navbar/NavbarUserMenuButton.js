import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Animated } from "react-animated-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useToggle from '../../modules/hooks/useToggle';

import { Creators as UserCreators } from '../../modules/ducks/user';
import { signOut } from '../../modules/services/auth';

const NavbarUserMenuButton = () => {

    const ref = useRef(null);
    const { isCollapsed, toggle } = useToggle();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const handleClickOutside = (e) => !ref.current.contains(e.target) && isCollapsed && toggle();
        document.addEventListener('mousedown', handleClickOutside, false);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, false);
        }
    })


    const handleSignOut = useCallback(() => {
        signOut()
        dispatch(UserCreators.signOut())
    },[dispatch])

    return (
        <div ref={ref} className="nav-item show">
            <button onClick={toggle} 
                className="btn btn-default shadow-none text-primary" 
                id="dropdownMenuButton" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded={isCollapsed}>
                <FontAwesomeIcon icon="ellipsis-v" />
            </button>
            <Animated aria-labelledby="dropdownMenuButton" className="mr-2 pt-0 pb-0 dropdown-menu dropdown-menu-right rounded border-0 shadow show" animateOnMount={false} animationIn="fadeInDown" animationOut="fadeOut" animationInDuration={300} animationOutDuration={300} isVisible={isCollapsed}>
                <button onClick={handleSignOut} className="dropdown-item pt-3 pb-3"><FontAwesomeIcon icon="sign-out-alt" /> Sair</button>
            </Animated>
        </div>
    ) 
}

export default NavbarUserMenuButton;

