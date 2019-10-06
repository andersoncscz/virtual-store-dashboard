import * as React from 'react';

import NavbarUserMenuButton from './NavbarUserMenuButton';
import NavbarMenuButton from './NavbarMenuButton';
import NavbarInfo from './NavbarInfo';

const Navbar = () => {

    return (
        <nav className="navbar navbar-light bg-white shadow-sm">
            <div className="d-flex justify-content-start flex-fill">
                <NavbarMenuButton icon="bars" />
                <NavbarInfo />
            </div>  
            <div className="d-flex nav justify-content-end">
                <div className="d-flex nav justify-content-end">
                    <NavbarUserMenuButton />
                </div>
            </div>
        </nav>    
    )
}

export default Navbar;