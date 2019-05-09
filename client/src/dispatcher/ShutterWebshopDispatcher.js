import {Dispatcher} from 'flux';

import ShutterConstants from '../constants/ShutterConstants';
import ShoppingCartConstants from '../constants/ShoppingCartConstants';
import OrderConstants from '../constants/OrderConstants';

import ShutterStore from '../store/ShutterStore';
import ShoppingCartStore from "../store/ShoppingCartStore";
import OrderStore from "../store/CustomerOrderStore";

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
        .then(response => {
            ShutterStore._shutters = response;
            ShutterStore.emitChange();
        })
});

dispatcher.register((data) => {
    if(data.payload.actionType !== ShutterConstants.FETCH_SELECTED_SHUTTER) {
        return;
    }

    fetch(`/shutters/${data.payload.payload}`)
        .then(response => {return response.json()})
        .then(response => {
            ShutterStore._selectedShutter = response[0];
            ShutterStore.emitChange();
        });
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

    const windowWidthInMeter = data.payload.payload.parameters.width / 100;
    const windowHeightInMeter = data.payload.payload.parameters.height / 100;
    const shutterPrice = data.payload.payload.shutter.price;
    const calculatedPrice = Math.round(windowWidthInMeter * windowHeightInMeter * shutterPrice);

    if(itemIndex === -1) {
        const cartItem = {...data.payload.payload, ...{quantity: 1}, ...{price: calculatedPrice}};
        ShoppingCartStore._cartItems.push(cartItem);
    } else {
        ShoppingCartStore._cartItems[itemIndex].quantity += 1;
        ShoppingCartStore._cartItems[itemIndex].price += calculatedPrice;
    }
    ShoppingCartStore._cartPrice += calculatedPrice;
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

    const windowWidthInMeter = data.payload.payload.parameters.width / 100;
    const windowHeightInMeter = data.payload.payload.parameters.height / 100;
    const shutterPrice = data.payload.payload.shutter.price;
    const calculatedPrice = Math.round(windowWidthInMeter * windowHeightInMeter * shutterPrice);

    if(ShoppingCartStore._cartItems[itemIndex].quantity > 1) {
        ShoppingCartStore._cartItems[itemIndex].quantity -= 1;
        ShoppingCartStore._cartItems[itemIndex].price -= calculatedPrice;
    } else {
        ShoppingCartStore._cartItems.splice(itemIndex, 1);
    }
    ShoppingCartStore._cartPrice -= calculatedPrice;
    ShoppingCartStore.emitChange();
});

dispatcher.register((data) => {
    if(data.payload.actionType !== OrderConstants.SEND_ORDER) {
        return;
    }
    fetch('/orders/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.payload.payload)
    }).then(response => response.json())
        .then(response => {
            OrderStore._sentOrderResponse = response;
            OrderStore.emitChange();
            ShoppingCartStore._cartItems = [];
            ShoppingCartStore._cartPrice = 0;
            ShoppingCartStore.emitChange();
        });
});

dispatcher.register((data) => {
   if(data.payload.actionType !== OrderConstants.FETCH_ORDERS_BY_USERNAME) {
       return;
   }
   fetch(`/orders/user/${data.payload.payload}`)
       .then(response => {return response.json()})
       .then(response => {
           OrderStore._ordersByUsername = response;
           OrderStore.emitChange();
       })
});

export default dispatcher;