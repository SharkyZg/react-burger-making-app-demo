import * as actionTypes from '../actions/actionTypes'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
};

let newPrice = null;
let updatedIngredients = null;
let purchasable = null;

const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
        return ingredients[igKey]
    }).reduce((sum, el) => {
        return sum + el;
    }, 0);
    return ({ purchasable: sum > 0 });
}

const addOrRemoveIngredient = (state, action, transactionType) => {
    const oldCount = state.ingredients[action.ingrType];
    let updatedCount = null;

    if (oldCount > 0 || transactionType === "add") {
        const priceAddition = INGREDIENT_PRICES[action.ingrType];
        const oldPrice = state.totalPrice;
        if (transactionType === "add") {
            updatedCount = oldCount + 1
            newPrice = oldPrice + priceAddition;
        }
        if (transactionType === "remove") {
            updatedCount = oldCount - 1
            newPrice = oldPrice - priceAddition;
        }
        updatedIngredients = {
            ...state.ingredients
        };
        updatedIngredients[action.ingrType] = updatedCount;

        purchasable = updatePurchaseState(updatedIngredients);
        return updatedIngredients, newPrice, purchasable;
    } else {
        return null, null, null;
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false
            }
        case actionTypes.ADD_INGREDIENT:
            updatedIngredients, newPrice, purchasable = addOrRemoveIngredient(state, action, "add")
            if (updatedIngredients != null) {
                return {
                    ...state,
                    ingredients: updatedIngredients,
                    totalPrice: newPrice,
                    purchasable: purchasable,
                }
            }
        case actionTypes.REMOVE_INGREDIENT:
            updatedIngredients, newPrice, purchasable = addOrRemoveIngredient(state, action, "remove")
            if (updatedIngredients != null) {
                return {
                    ...state,
                    ingredients: updatedIngredients,
                    totalPrice: newPrice,
                    purchasable: purchasable,
                }
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
            }
        default:
            return state;
    }
    return state;
};

export default reducer;