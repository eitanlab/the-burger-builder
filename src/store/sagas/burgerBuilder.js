import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../hoc/axios-orders';


export function* initIngredientsSaga() {    
    try {
        const response = yield axios.get('/ingredients.json');
        yield put(actions.setIngredients(response.data));
    } catch (error){
        yield put(actions.fetchIngredientsFailed());
    }
}