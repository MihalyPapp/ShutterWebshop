import OrderConstants from '../constants/OrderConstants';
import ShutterWebshopDispatcher from '../dispatcher/ShutterWebshopDispatcher';

class OrderActions {
    sendOrder(order) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: OrderConstants.SEND_ORDER,
            payload: order
        });
    }

    fetchOrdersByUsername(username) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: OrderConstants.FETCH_ORDERS_BY_USERNAME,
            payload: username
        })
    }
}

export default new OrderActions();