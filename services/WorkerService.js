function WorkerService() {
    this.workerDAO = require('../daos/WorkerDAO');
}

WorkerService.prototype.listOrders = function(callback) {
    this.workerDAO.findOrders(callback);
};

WorkerService.prototype.listOrderParameters = function(_id, callback) {
    this.workerDAO.findOrderParameters(_id, result => {
        const cartItems = result[0].cartItems;
        const parameters = cartItems.map(item => {
            return ({
                width: item.parameters.width,
                height: item.parameters.height,
                slat: item.parameters.slat,
                partNo: item.shutter.partNo,
                quantity: item.quantity
            });
        });
        const order = {
            _id: result[0]._id,
            parameters
        };
        callback(order);
    });
};

WorkerService.prototype.updateOrder = function(data, callback) {
    data['status'] = 'ASSEMBLING';
    this.workerDAO.updateOrder(data, callback);
};

module.exports = new WorkerService();