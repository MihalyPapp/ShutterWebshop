import WorkerConstants from '../constants/WorkerConstants';
import ShutterWebshopDispatcher from '../dispatcher/ShutterWebshopDispatcher';

class WorkerActions {
    fetchOrders() {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: WorkerConstants.FETCH_ORDERS,
            payload: null
        });
    }

}

export default new WorkerActions();