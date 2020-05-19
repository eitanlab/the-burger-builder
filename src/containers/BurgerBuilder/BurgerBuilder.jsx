import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addIngredient, removeIngredient, initIngredients, purchaseInit, setAuthRedirectPath} from '../../store/actions/index';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../hoc/axios-orders';

// NO ESTÁ FUNCIONANDO EL REDIRECT PATH CUANDO COMPRO SIN ESTAR LOGEADO

export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.auth.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null); 
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(initIngredients());
    },[]);

    const purchaseHandler = () => {
        console.log('isAthenticated',isAuthenticated)
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            dispatch(setAuthRedirectPath('/checkout'));
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        purchaseInit();
        props.history.push('/checkout');
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const cleanOrderHandler = () => {
        /* const ingredients = ings;
        Object.keys(ingredients).foreach(type => {
            ingredients[type] = 0;
        });
        this.setState({ ingredients: ingredients, totalPrice: 0, purchasable: false }); */
    }
    
    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    
    let orderSummary = null;
    
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;
    
    if(ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls 
                    ingredientAdded={(type) => dispatch(addIngredient(type))}
                    ingredientRemoved={(type) => dispatch(removeIngredient(type))}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    price={price} 
                    ordered={purchaseHandler}
                    cleaned={cleanOrderHandler}
                    isAuth={isAuthenticated}
                    />
            </Aux>
        );

        orderSummary = <OrderSummary 
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                ingredients={ings} 
                price= {price}/>;
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

export default withErrorHandler(BurgerBuilder, axios);