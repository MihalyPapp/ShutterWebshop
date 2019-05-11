import WorkerConstants from '../constants/WorkerConstants';
import ShutterWebshopDispatcher from '../dispatcher/ShutterWebshopDispatcher';

class WorkerActions {
    fetchOrdersDetails() {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: WorkerConstants.FETCH_ORDERS_DETAILS_BY_WORKER,
            payload: null
        });
    }

    fetchOrderParameters(_id) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: WorkerConstants.FETCH_ORDER_PARAMETERS_BY_WORKER,
            payload: _id
        });
    }

    updateOrder(data) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: WorkerConstants.UPDATE_ORDER_BY_WORKER,
            payload: data
        });
    }

    setSentStatus(ZeroOrOne) {
        ShutterWebshopDispatcher.handleViewAction(({
            actionType: WorkerConstants.SET_SENT_STATUS,
            payload: ZeroOrOne
        }))
    }
}

export default new WorkerActions();