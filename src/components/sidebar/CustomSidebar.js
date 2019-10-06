import React, { useCallback } from 'react';
import Sidebar from "react-sidebar";
import { useSelector, useDispatch } from 'react-redux';
import { Creators as SidebarActions } from '../../modules/ducks/sidebar';
import CustomSidebarContent from './CustomSidebarContent';

const CustomSidebar = ({ children, history }) => {
    const { toggleSidebar } = SidebarActions;
    const dispatch = useDispatch();
    
    const isSidebarOpened = useSelector(state => state.ui.isSidebarOpened);

    const handleOpen = useCallback(
        () => dispatch(toggleSidebar()),
        [dispatch, toggleSidebar]
    )

    return (
        <div>
            <Sidebar
                sidebarClassName="bg-white"
                sidebar={<CustomSidebarContent history={history} />}
                children={children}
                open={isSidebarOpened}
                onSetOpen={handleOpen}
                defaultSidebarWidth={280}
                styles={{ sidebar: { width: 280 } }} />
        </div>
    );
}

export default CustomSidebar;