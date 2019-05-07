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
    //console.log("bejovo")
    //console.log(data.payload.payload)
    const itemIndex = ShoppingCartStore._cartItems.findIndex(element => {
        //console.log("storebalevo")
        //console.log(element)
        return (
            JSON.stringify(data.payload.payload.shutter) === JSON.stringify(element.shutter) &&
            JSON.stringify(data.payload.payload.parameters) === JSON.stringify(element.parameters)
        );
    });
    const cartItem = {...data.payload.payload, ...{quantity: 1}, ...{price: data.payload.payload.shutter.price}};
    if(itemIndex === -1) {
        //console.log("más")
        ShoppingCartStore._cartItems.push(cartItem);
    } else {
        //console.log("egyforma")
        ShoppingCartStore._cartItems[itemIndex].quantity += 1;
        ShoppingCartStore._cartItems[itemIndex].price += data.payload.payload.shutter.price;
    }
    ShoppingCartStore._cartPrice += data.payload.payload.shutter.price;
    //console.log(ShoppingCartStore._cartItems)
    ShoppingCartStore.emitChange();
});

export default dispatcher;