import ShutterConstants from '../constants/ShutterConstants';
import ShutterWebshopDispatcher from '../dispatcher/ShutterWebshopDispatcher';

class ShutterActions {
    fetchShutters() {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: ShutterConstants.FETCH_SHUTTERS,
            payload: null
        });
    }
    setSelectedShutter(shutter) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: ShutterConstants.SELECTED_SHUTTER,
            payload: shutter
        });
    }
    setSelectedShutterByFetch(_id) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: ShutterConstants.SELECTED_SHUTTER_FETCH_BY_ID,
            payload: _id
        });
    }
}

export default new ShutterActions();