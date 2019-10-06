import React, { useCallback } from 'react';
import { NavLink } from "react-router-dom";
import { uniqueId } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as SidebarActions } from '../../modules/ducks/sidebar';
import animate from 'css-animation';
import Menu, { SubMenu, MenuItem, Divider } from 'rc-menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'rc-menu/assets/index.css';
import './style.scss';


const CustomSidebarContent = () => {
    const { toggleSidebar } = SidebarActions;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleMenuItemClick = useCallback(
        () => dispatch(toggleSidebar()),
        [dispatch, toggleSidebar]
    )

    const { email } = user || '';    

    const renderMenuContent = useCallback((item, paddingLeft) => {
        
        const { submenu } = item;
        const { route, title, icon } = item;
        paddingLeft = paddingLeft + 20
        if (!submenu) {
            const { divide } = item;
            return !divide ?(
                <MenuItem className="w-100 p-0" key={`MenuItem-${uniqueId()}`}>
                    <NavLink activeClassName="active-route" to={route} className="d-flex align-items-center text-decoration-none font-weight-light text-center h-100">
                        <div style={{paddingLeft: paddingLeft}}>
                            <FontAwesomeIcon icon={icon} {...item.iconAnimation} /><span className="ml-3">{title}</span>
                        </div>
                    </NavLink>
                </MenuItem>
            )
            : <Divider key={`Divider-${uniqueId()}`} />
        }
        else {
            return (
                <SubMenu 
                    className="font-weight-light" key={`SubMenu-${uniqueId()}`} 
                    title={
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={submenu.icon}/><span className="pl-2">{submenu.title}</span>
                        </div>
                    }>
                        { submenu.children.map(e => renderMenuContent(e, paddingLeft)) }
                </SubMenu>                
            )
        }
    },[])



    return (
        <div className="d-flex flex-column justify-content-start align-items-stretch h-auto overflow-y">
            <div className="border-bottom" style={{height: 165}}>
                <div className="d-flex flex-column h-100 w-100">
                    <div className="h-75 pt-0 pl-4">
                        <div className="rounded-circle mt-4 bg-primary d-flex justify-content-center align-items-center" style={{ maxHeight: 80, maxWidth: 80}}>
                            <span className="text-white pt-2 pb-2 text-center display-4">{email&&email.substring(0,1).toUpperCase()}</span>
                        </div>
                    </div>
                    <div className="d-flex flex-column text-dark w-100 h-50 pt-3 pl-4">
                        <span style={{fontSize: 14}}>{email}</span>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column h-auto">
                <Menu onClick={handleMenuItemClick} openAnimation={animation} className="h-auto rounded-0 border-0 shadow-none" mode="inline">
                    { menu.map(e => renderMenuContent(e, 0)) }
                </Menu>          
            </div>
        </div>
    )
}
const animation = {
    enter(node, done) {
      let height;
      return animate(node, 'rc-menu-collapse', {
        start() {
          height = node.offsetHeight;
          node.style.height = 0;
        },
        active() {
          node.style.height = `${height}px`;
        },
        end() {
          node.style.height = '';
          done();
        },
      });
    },
  
    appear() {
      return this.enter.apply(this, arguments);
    },
  
    leave(node, done) {
      return animate(node, 'rc-menu-collapse', {
        start() {
          node.style.height = `${node.offsetHeight}px`;
        },
        active() {
          node.style.height = 0;
        },
        end() {
          node.style.height = '';
          done();
        },
      });
    },
  };

const menu = [
    {
        title: 'Dashboard',
        route: '/dashboard',
        icon: 'chart-pie',
    },
    {
        title: 'Produtos',
        route: '/products',
        icon: 'tshirt',
    },
    {
        divide: true
    },
    {
        title: 'Submenus',
        route: '#',
        icon: 'bars',
        submenu: {
            title: 'Sub Menu 1',
            icon: 'coins',            
            children: [
                {
                    title: 'Dashboard',
                    route: '/dashboard',
                    icon: 'chart-pie',
                    submenu: {
                        title: 'Sub Menu 2',
                        icon: 'coins',            
                        children: [
                            {
                                title: 'Dashboard',
                                route: '/dashboard',
                                icon: 'chart-pie',
                                submenu: {
                                    title: 'Sub Menu 3',
                                    icon: 'coins',            
                                    children: [
                                        {
                                            title: 'Dashboard',
                                            route: '/dashboard',
                                            icon: 'chart-pie',
                                            submenu: {
                                                title: 'Sub Menu 4',
                                                icon: 'coins',            
                                                children: [
                                                    {
                                                        title: 'Dashboard',
                                                        route: '/dashboard',
                                                        icon: 'chart-pie',
                                                    },
                                                ]
                                            }                                                                
                                        },
                                    ]
                                }                                                    
                            },
                        ]
                    }                    
                },
            ]
        }
    },
]

export default CustomSidebarContent;