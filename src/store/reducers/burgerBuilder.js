import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { fetchOrdersStart } from '../actions/order';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.20,
    cheese: 1.50,
    meat: 2,
    bacon: 1
};

const addIngredient = (state, action) => {
    const updatedIngredientMore = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredientsMore = updateObject(state.ingredients, updatedIngredientMore);
    const updatedStateMore = {
        ingredients: updatedIngredientsMore,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedStateMore);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {error: true});
}

const removeIngredient = (state, action) => {
    const updatedIngredientLess = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngredientsLess = updateObject(state.ingredients, updatedIngredientLess);
    const updatedStateLess = {
        ingredients: updatedIngredientsLess,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedStateLess);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT: return addIngredient(state,action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
}

export default reducer;