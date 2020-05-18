import React, { useState } from 'react';
import {useSelector} from 'react-redux'

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Aux>
            <Toolbar 
                drawerToggleClicked={sideDrawerToggleHandler}
                isAuth={isAuthenticated} />
            <SideDrawer 
                open={showSideDrawer} 
                closed={sideDrawerClosedHandler}
                isAuth={isAuthenticated} 
                className={classes.SideDrawer}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

/* class Layout extends Component {
    state = {
        showSideDrawer: false    
    }
    
    sideDrawerClosedHandler = () => {
        setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render () {
        return (
            <Aux>
                <Toolbar 
                    drawerToggleClicked={sideDrawerToggleHandler}
                    isAuth={isAuthenticated} />
                <SideDrawer 
                    open={state.showSideDrawer} 
                    closed={sideDrawerClosedHandler}
                    isAuth={isAuthenticated} />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
} */

export default Layout;