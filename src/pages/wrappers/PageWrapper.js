import React from 'react';
import CustomSideBar from '../../components/sidebar/CustomSidebar';

import Navbar from '../../components/navbar/Navbar';

const PageWrapper = ({ history, children, withNavBar = true }) => (
    <div className="bg-light vh-100">
        <CustomSideBar history={history} children={
            <main>
                { withNavBar && <Navbar /> }
                { children }
            </main>
        } />
    </div>
)

export default PageWrapper;