import OrderConstants from '../constants/OrderConstants';
import ShutterWebshopDispatcher from '../dispatcher/ShutterWebshopDispatcher';

class OrderActions {
    sendOrder(order) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: OrderConstants.SEND_ORDER,
            payload: order
        });
    }
}

export default new OrderActions();