import {Dispatcher} from 'flux';
import React from 'react';

import ShutterConstants from '../constants/ShutterConstants';
import ShoppingCartConstants from '../constants/ShoppingCartConstants';

import ShutterStore from '../store/ShutterStore';
import ShoppingCartStore from "../store/ShoppingCartStore";

class ShutterWebshopDispatcher extends Dispatcher {
    handleViewAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            payload: action
        });
    }
}

const dispatcher = new ShutterWebshopDispatcher();

dispatcher.register((data) => {
    if(data.payload.actionType !== ShutterConstants.FETCH_SHUTTERS) {
        return;
    }

    fetch('/shutters')
        .then(response => {return response.json()})
        .then(result => {
            ShutterStore._shutters = result;
            ShutterStore.emitChange();
        })
});

dispatcher.register((data) => {
    if(data.payload.actionType !== ShutterConstants.SELECTED_SHUTTER) {
        return;
    }

    ShutterStore._selectedShutter = ShutterStore._shutters.find(shutter => {
        return shutter._id === data.payload.payload._id;
    });

    ShutterStore.emitChange();
});

dispatcher.register((data) => {
    if(data.payload.actionType !== ShoppingCartConstants.ADD_TO_SHOPPING_CART) {
        return;
    }

    let cartItemIndex = ShoppingCartStore._cartItems.findIndex(cartItem => {
        console.log("cartitem")
        console.log(cartItem)
        console.log("payload")
        console.log(data.payload.payload)
       return JSON.stringify(cartItem.shutter) === JSON.stringify(data.payload.payload.shutter) &&
           JSON.stringify(cartItem.parameters) === JSON.stringify(data.payload.payload.parameters);
    });
    console.log(cartItemIndex);

    if(cartItemIndex === -1) {
        console.log("nem talált")
        const merged = {...data.payload.payload, ...{quantity: 1}};
        ShoppingCartStore._cartItems.push(merged);
        console.log(merged)
    } else {
        console.log("talált")
        ShoppingCartStore._cartItems[cartItemIndex].quantity += 1;
        console.log(ShoppingCartStore._cartItems[cartItemIndex])
    }
    ShoppingCartStore.emitChange();
});

export default dispatcher;