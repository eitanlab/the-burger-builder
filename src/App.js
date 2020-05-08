import React, {Component, lazy, Suspense} from "react"

import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
//import Checkout from "./containers/Checkout/Checkout.jsx"
//import Orders from './containers/Orders/Orders.jsx'
import { Route, Switch, withRouter, Redirect } from "react-router-dom"
//import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import * as actions from './store/actions/index'

const Checkout = lazy(() => import('./containers/Checkout/Checkout.jsx'));
const Orders = lazy(() => import('./containers/Orders/Orders.jsx'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
	componentDidMount () {
		this.props.onTryAutoSignup();
	}
	render () {
		let routes = (
			<Suspense fallback={<span>Loading...</span>}>
				<Switch>
					<Route path="/auth" render={ props => <Auth  {...props} /> } />
					<Route path="/" exact component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			</Suspense>
		);

		if(this.props.isAuthenticated) {
			routes = (
				<Suspense fallback={<span>Loading...</span>}>
					<Switch>
						<Route path="/checkout" render={ props => <Checkout {...props} /> } />
						<Route path="/orders" render={ props => <Orders {...props} /> } />
						<Route path="/logout" component={Logout} />
						<Route path="/auth" render={ props => <Auth {...props} /> } />
						<Route path="/" exact component={BurgerBuilder} />
						<Redirect to="/" />
					</Switch>
				</Suspense>
			);
		}

		return (
			<div>
				<Layout>
					{routes}
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
