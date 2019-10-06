import React from 'react';

const TabsContent = ({ children }) => {
    return (
        <div className="tab-content pt-4" id="nav-tabContent">
            {children}
        </div>            
    )
}

export default TabsContent