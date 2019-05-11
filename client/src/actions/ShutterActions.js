import ShutterConstants from '../constants/ShutterConstants';
import ShutterWebshopDispatcher from '../dispatcher/ShutterWebshopDispatcher';

class ShutterActions {
    fetchShuttersDetails() {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: ShutterConstants.FETCH_SHUTTERS_DETAILS,
            payload: null
        });
    }

    fetchShutter(_id) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: ShutterConstants.FETCH_SHUTTER,
            payload: _id
        });
    }
}

export default new ShutterActions();