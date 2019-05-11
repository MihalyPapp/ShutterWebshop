import ManagerConstants from '../constants/ManagerConstants';
import ShutterWebshopDispatcher from '../dispatcher/ShutterWebshopDispatcher';

class ManagerActions {
    fetchOrdersDetails() {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: ManagerConstants.FETCH_ORDERS_DETAILS_BY_MANAGER,
            payload: null
        });
    }

    fetchOrder(_id) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: ManagerConstants.FETCH_ORDER_BY_MANAGER,
            payload: _id
        });
    }
}

export default new ManagerActions();