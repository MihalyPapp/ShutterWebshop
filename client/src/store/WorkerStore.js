import {EventEmitter} from 'events';

class WorkerStore extends EventEmitter {

    _ordersDetails = [];
    _orderParameters = [];
    _orderId = null;
    _sentUpdateResponse = null;
    _sentUpdateStatus = {};

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