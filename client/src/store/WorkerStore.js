import {EventEmitter} from 'events';

class WorkerStore extends EventEmitter {

    _orders = [];
    _selectedOrderParts = [];

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