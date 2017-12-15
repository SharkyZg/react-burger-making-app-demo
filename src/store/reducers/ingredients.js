import * as actionTypes from '../actions'

const initialState = {
    ingredients: null,
    totalPrice: 4,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
            }
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                counter: state.counter - 1
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