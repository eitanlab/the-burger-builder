import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {props.isAuthenticated 
            ? <NavigationItem link="/logout">logout</NavigationItem>
            : <NavigationItem link="/auth">Autenticate</NavigationItem>
        }
    </ul>
);

export default navigationItems;