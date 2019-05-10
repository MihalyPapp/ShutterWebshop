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
        ShutterWebshopDispatcher.handleViewAction({
            actionType: WorkerConstants.FETCH_ORDER_PARAMETERS,
            payload: _id
        });
    }

    updateOrder(data) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: WorkerConstants.UPDATE_ORDER,
            payload: data
        });
        console.log(data);
    }

    setUpdateSentStatus(ZeroOrOne) {
        ShutterWebshopDispatcher.handleViewAction(({
            actionType: WorkerConstants.SET_UPDATE_SENT_STATUS,
            payload: ZeroOrOne
        }))
    }
}

export default new WorkerActions();