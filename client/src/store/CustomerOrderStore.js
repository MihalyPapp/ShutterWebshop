import {EventEmitter} from 'events';

class CustomerOrderStore extends EventEmitter {

    _sentOrderResponse = {};
    _ordersByUsername = [];

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

export default new CustomerOrderStore();