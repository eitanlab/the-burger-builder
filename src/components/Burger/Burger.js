import React from 'react';
import PropTypes from 'prop-types';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    // Extrae los keys del objeto y devuelve un array
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />;
        }); // [,]
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if (transformedIngredients.length === 0 ) {
        transformedIngredients = <p>Please add ingredients</p>
    }
    console.log(transformedIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

burger.propTypes = {
    
};

export default burger;