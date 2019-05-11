import {EventEmitter} from 'events';

class ManagerStore extends EventEmitter {

    _ordersDetails = [];
    _order = [];

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

export default new ManagerStore();