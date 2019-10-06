import React from 'react';
import logo from '../../assets/images/logo.png';

const NavbarInfo = () => {
    
    const title = 'Style Shop - Admin';

    return (
        <div className="d-flex ml-4">
            <img src={logo} alt="logo" className="ml-2 mr-2" style={styles.logo} />
            <span className="navbar-brand text-primary pl-2 d-none d-md-block">{title.length <= 30 ? title : title.substring(0, 30) + '...'}</span>
        </div>
    )
}

const styles = {
    logo: {
        maxWidth: '40px',
        maxHeight: '40px'
    }
}

export default NavbarInfo;