import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import * as actionTypes from '../../store/actions/actionTypes'
import * as actions from '../../store/actions/index'



class BurgerBuilder extends Component {

    state = {      
        purchasing: false,

    }

    componentDidMount() {
        this.props.onLoadIngredients();
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchased();
        this.props.history.push({
            pathname: '/checkout',
        });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        purchasable={this.props.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice} />
                </Aux>);
            orderSummary = (<OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ingredients}
                price={this.props.totalPrice} />);
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.inr.ingredients,
        totalPrice: state.inr.totalPrice,
        purchasable: state.inr.purchasable,
        error: state.inr.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadIngredients: () => dispatch(actions.initIngredients()),
        onAddIngredient: (type) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingrType: type }),
        onRemoveIngredient: (type) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingrType: type }),
        onInitPurchased: () => dispatch(actions.purchaseInit())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));