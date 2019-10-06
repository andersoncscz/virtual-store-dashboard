import React from 'react';

const TabsHeader = ({ children }) => {
    return (
        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                {children}
            </div>
        </nav>
    )
}

export default TabsHeader