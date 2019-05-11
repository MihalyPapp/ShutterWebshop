import {Dispatcher} from 'flux';
import React from 'react';
import ReactDOM from 'react-dom';

import WorkerParameterPanel from '../components/worker/ParameterPanel';
import ManagerParameterPanel from '../components/manager/ParameterPanel';
import ShutterConstants from '../constants/ShutterConstants';
import ShoppingCartConstants from '../constants/ShoppingCartConstants';
import CustomerConstants from '../constants/CustomerConstants';
import WorkerConstants from '../constants/WorkerConstants';
import ManagerConstants from '../constants/ManagerConstants'
import ShutterStore from '../store/ShutterStore';
import ShoppingCartStore from "../store/ShoppingCartStore";
import CustomerStore from "../store/CustomerStore";
import WorkerStore from "../store/WorkerStore";
import ManagerStore from "../store/ManagerStore";

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
    if(data.payload.actionType !== ShutterConstants.FETCH_SHUTTERS_DETAILS) {
        return;
    }

    fetch('/shutters/details/list')
        .then(response => {return response.json()})
        .then(response => {
            ShutterStore._shuttersDetails = response;
            ShutterStore.emitChange();
        })
});

dispatcher.register((data) => {
    if(data.payload.actionType !== ShutterConstants.FETCH_SHUTTER) {
        return;
    }

    fetch(`/shutters/list/${data.payload.payload}`)
        .then(response => {return response.json()})
        .then(response => {
            ShutterStore._shutter = response[0];
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
    if(data.payload.actionType !== CustomerConstants.SEND_ORDER) {
        return;
    }

    fetch('/customer/order/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.payload.payload)
    }).then(response => response.json())
        .then(response => {
            CustomerStore._sentOrderResponse = response;
            CustomerStore.emitChange();
            ShoppingCartStore._cartItems = [];
            ShoppingCartStore._cartPrice = 0;
            ShoppingCartStore.emitChange();
        });
});

dispatcher.register((data) => {
   if(data.payload.actionType !== CustomerConstants.FETCH_ORDERS_BY_CUSTOMER) {
       return;
   }

   fetch(`/customer/orders/list/${data.payload.payload}`)
       .then(response => {return response.json()})
       .then(response => {
           CustomerStore._orders = response;
           CustomerStore.emitChange();
       })
});

dispatcher.register((data) => {
    if(data.payload.actionType !== WorkerConstants.FETCH_ORDERS_DETAILS_BY_WORKER) {
        return;
    }

    fetch('/worker/orders/details/list')
        .then(response => {return response.json()})
        .then(response => {
            WorkerStore._ordersDetails = response;
            WorkerStore.emitChange();
        })
});

dispatcher.register((data) => {
    if(data.payload.actionType !== WorkerConstants.FETCH_ORDER_PARAMETERS_BY_WORKER) {
        return;
    }

    fetch(`/worker/order/parameters/list/${data.payload.payload}`, {
    }).then(response => response.json())
        .then(response => {
            WorkerStore._orderParameters = response.parameters;
            WorkerStore._orderId = response._id;
            WorkerStore.emitChange();
        });

    ReactDOM.render(
        React.createElement(WorkerParameterPanel),
        document.getElementById('workerContentPanel')
    );
});

dispatcher.register((data) => {
    if(data.payload.actionType !== WorkerConstants.UPDATE_ORDER_BY_WORKER) {
        return;
    }

    fetch('/worker/order/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.payload.payload)
    }).then(response => response.json())
        .then(response => {
            const orderIndex = WorkerStore._ordersDetails.findIndex(order => {
                return order._id === WorkerStore._orderId
            });
            if(response.ok) {
                WorkerStore._ordersDetails.splice(orderIndex, 1);
            }
            WorkerStore._sentUpdateResponse = response;
            WorkerStore.emitChange();
        });

    ReactDOM.unmountComponentAtNode(document.getElementById('workerContentPanel'));
});

dispatcher.register((data) => { ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   if(data.payload.actionType !== WorkerConstants.SET_SENT_STATUS) {
       return;
   }

   WorkerStore._sentUpdateStatus = data.payload.payload;
   WorkerStore.emitChange();
});

dispatcher.register((data) => {
    if(data.payload.actionType !== ManagerConstants.FETCH_ORDERS_DETAILS_BY_MANAGER) {
        return;
    }

    fetch('/manager/orders/details/list')
        .then(response => {return response.json()})
        .then(response => {
            ManagerStore._ordersDetails = response;
            ManagerStore.emitChange();
        })
});

dispatcher.register((data) => {
    if(data.payload.actionType !== ManagerConstants.FETCH_ORDER_BY_MANAGER) {
        return;
    }

    fetch(`/manager/order/list/${data.payload.payload}`, {
    }).then(response => response.json())
        .then(response => {
            ManagerStore._order = response;
            ManagerStore.emitChange();
        });

    ReactDOM.render(
        React.createElement(ManagerParameterPanel),
        document.getElementById('managerContentPanel')
    );
});

export default dispatcher;