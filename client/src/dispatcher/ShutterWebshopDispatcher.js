import {Dispatcher} from 'flux';

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

    fetch('/shutters/list')
        .then(response => {return response.json()})
        .then(result => {
            ShutterStore._shutters = result;
            ShutterStore.emitChange();
        })
});

dispatcher.register((data) => {
    if(data.payload.actionType !== ShutterConstants.SELECTED_SHUTTER_FETCH_BY_ID) {
        return;
    }

    fetch(`/shutters/${data.payload.payload}`)
        .then(response => {return response.json()})
        .then(result => {
            ShutterStore._selectedShutter = result[0];
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
    const itemIndex = ShoppingCartStore._cartItems.findIndex(element => {
        return (
            JSON.stringify(data.payload.payload.shutter) === JSON.stringify(element.shutter) &&
            JSON.stringify(data.payload.payload.parameters) === JSON.stringify(element.parameters)
        );
    });
    const cartItem = {...data.payload.payload, ...{quantity: 1}, ...{price: data.payload.payload.shutter.price}};
    if(itemIndex === -1) {
        ShoppingCartStore._cartItems.push(cartItem);
    } else {
        ShoppingCartStore._cartItems[itemIndex].quantity += 1;
        ShoppingCartStore._cartItems[itemIndex].price += data.payload.payload.shutter.price;
    }
    ShoppingCartStore._cartPrice += data.payload.payload.shutter.price;
    ShoppingCartStore.emitChange();
});

dispatcher.register((data) => {
    if(data.payload.actionType !== ShoppingCartConstants.REMOVE_FROM_SHOPPING_CART) {
        return;
    }
    const itemIndex = ShoppingCartStore._cartItems.findIndex(element => {
        return (
            JSON.stringify(data.payload.payload.shutter) === JSON.stringify(element.shutter) &&
            JSON.stringify(data.payload.payload.parameters) === JSON.stringify(element.parameters)
        );
    });

    if(ShoppingCartStore._cartItems[itemIndex].quantity > 1) {
        ShoppingCartStore._cartItems[itemIndex].quantity -= 1;
        ShoppingCartStore._cartItems[itemIndex].price -= data.payload.payload.shutter.price;
    } else {
        ShoppingCartStore._cartItems.splice(itemIndex, 1);
    }
    ShoppingCartStore._cartPrice -= data.payload.payload.shutter.price;
    ShoppingCartStore.emitChange();
});

export default dispatcher;