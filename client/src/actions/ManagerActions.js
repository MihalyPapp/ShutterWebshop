import ManagerConstants from '../constants/ManagerConstants';
import ShutterWebshopDispatcher from '../dispatcher/ShutterWebshopDispatcher';

class ManagerActions {
    fetchOrders() {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: ManagerConstants.FETCH_ORDERS,
            payload: null
        });
    }
}

export default new ManagerActions();