import ShutterConstants from '../constants/ShutterConstants';
import ShutterWebshopDispatcher from '../dispatcher/ShutterWebshopDispatcher';

class ShutterActions {
    fetchShutters() {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: ShutterConstants.FETCH_SHUTTERS,
            payload: null
        });
    }

    fetchSelectedShutter(_id) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: ShutterConstants.FETCH_SELECTED_SHUTTER,
            payload: _id
        });
    }
}

export default new ShutterActions();