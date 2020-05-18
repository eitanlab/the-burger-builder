import React, {lazy, Suspense, useEffect} from "react"
import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import { Route, Switch, withRouter, Redirect } from "react-router-dom"
import Logout from './containers/Auth/Logout/Logout'
import { useDispatch, useSelector } from 'react-redux'
import {authCheckState} from './store/actions/index'

const Checkout = lazy(() => import('./containers/Checkout/Checkout.jsx'));
const Orders = lazy(() => import('./containers/Orders/Orders.jsx'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

const App = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(state => state.auth.token !== null);

	useEffect(() => {
		dispatch(authCheckState());
	}, [dispatch]);

	let routes = (
			<Switch>
				<Route path="/auth" render={ props => <Auth  {...props} /> } />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
	);

	if(isAuthenticated) {
		routes = (
				<Switch>
					<Route path="/checkout" render={ props => <Checkout {...props} /> } />
					<Route path="/orders" render={ props => <Orders {...props} /> } />
					<Route path="/logout" component={Logout} />
					<Route path="/auth" render={ props => <Auth {...props} /> } />
					<Route path="/" exact component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
		);
	}

	return (
		<div>
			<Layout>
				<Suspense fallback={<span>Loading...</span>}>
					{routes}
				</Suspense>
			</Layout>
		</div>
	);
}

export default withRouter(App);


/* class App extends Component {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));*/
