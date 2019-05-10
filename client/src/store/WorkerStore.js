import {EventEmitter} from 'events';

class WorkerStore extends EventEmitter {

    _orders = [];
    _selectedOrderParameters = [];
    _selectedOrderId = null;
    _sentUpdateResponse = null;

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

export default new WorkerStore();