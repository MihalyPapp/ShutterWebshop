import {EventEmitter} from 'events';

class ShoppingCartStore extends EventEmitter {

    _cartItems = [];
    _cartPrice = 0;

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