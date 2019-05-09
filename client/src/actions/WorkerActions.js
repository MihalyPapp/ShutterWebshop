import WorkerConstants from '../constants/WorkerConstants';
import ShutterWebshopDispatcher from '../dispatcher/ShutterWebshopDispatcher';

class WorkerActions {
    fetchOrders() {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: WorkerConstants.FETCH_ORDERS,
            payload: null
        });
    }

    fetchOrderParameters(_id) {
        ShutterWebshopDispatcher.handleViewAction(({
            actionType: WorkerConstants.FETCH_ORDER_PARAMETERS,
            payload: _id
        }));
    }
}

export default new WorkerActions();