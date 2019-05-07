import {EventEmitter} from 'events';

class ShutterStore extends EventEmitter {

    _shutters = [];
    _selectedShutter = null;

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

export default new ShutterStore();