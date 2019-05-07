import {EventEmitter} from 'events';

class ShoppingCartStore extends EventEmitter {

    _cartItems = [];

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

export default new ShoppingCartStore();