import CustomerConstants from '../constants/CustomerConstants';
import ShutterWebshopDispatcher from '../dispatcher/ShutterWebshopDispatcher';

class CustomerActions {
    sendOrder(order) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: CustomerConstants.SEND_ORDER,
            payload: order
        });
    }

    fetchOrders(username) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: CustomerConstants.FETCH_ORDERS_BY_CUSTOMER,
            payload: username
        })
    }
}

export default new CustomerActions();