import StatisticsConstants from '../constants/StatisticsConstants';
import ShutterWebshopDispatcher from '../dispatcher/ShutterWebshopDispatcher';

class StatisticsActions {
    fetchSlatsData() {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: StatisticsConstants.FETCH_SLATS_DATA,
            payload: null
        });
    }
}

export default new StatisticsActions();