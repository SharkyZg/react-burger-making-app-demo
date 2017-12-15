import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

class Burger extends Component {
    state = {}


    render() {
        console.log(this.props.ingredients)
        let transfromedIngredients = Object.keys(this.props.ingredients).map(igKey => {
            return [...Array(this.props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        })
            .reduce((arr, el) => {
                return arr.concat(el);
            }, []);

        if (transfromedIngredients.length === 0) {
            transfromedIngredients = <p>Please start adding ingredients.</p>
        }
        return (
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top" />
                {transfromedIngredients}
                <BurgerIngredient type="bread-bottom" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.inr.ingredients,
        totalPrice: state.inr.totalPrice
    };
};

export default connect(mapStateToProps)(Burger);

