import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import MenuButton from '../SideDrawer/MenuButton/MenuButton'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <MenuButton clicked={props.drawerOpenClicked} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default toolbar