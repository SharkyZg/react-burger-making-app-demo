import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const loadIngredients = (ingredients) => {
    return {
        type: actionTypes.LOAD_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-a430f.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(loadIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    }
}


