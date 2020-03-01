import React from "react";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout.jsx";
import { Route, Switch } from "react-router-dom";

function App() {
	return (
		<div>
			<Layout>
				<Switch>
					<Route path="/checkout" component={Checkout} />
					<Route path="/" component={BurgerBuilder} />
				</Switch>
			</Layout>
		</div>
	);
}

export default App;
