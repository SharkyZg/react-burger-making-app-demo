import * as actionTypes from '../actions'

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

const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
        return ingredients[igKey]
    }).reduce((sum, el) => {
        return sum + el;
    }, 0);
    return ({ purchasable: sum > 0 });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
            }
        case actionTypes.ADD_INGREDIENT:
            const oldCount = state.ingredients[action.ingrType];
            const updatedCount = oldCount + 1;
            const updatedIngredients = {
                ...state.ingredients
            };
            updatedIngredients[action.ingrType] = updatedCount;
            const priceAddition = INGREDIENT_PRICES[action.ingrType];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice + priceAddition;
            const purchasable = updatePurchaseState(updatedIngredients);
            return {
                ...state,
                ingredients: updatedIngredients,
                totalPrice: newPrice, 
                purchasable: purchasable,

            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                counter: state.counter + action.value
            }
    }
    return state;
};

export default reducer;