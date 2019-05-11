import {EventEmitter} from 'events';

class StatisticsStore extends EventEmitter {

    _slatsData = [];

    emitChange() {
        this.emit('change');
    }

    addChangeListener(callback) {
        this.on('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
}

export default new StatisticsStore();