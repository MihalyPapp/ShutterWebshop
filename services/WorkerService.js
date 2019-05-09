function WorkerService() {
    this.workerDAO = require('../daos/WorkerDAO');
}

WorkerService.prototype.listOrders = function(callback) {
    this.workerDAO.findOrder(callback);
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
            id: result[0]._id,
            parameters
        };
        callback(order);
    });
};

module.exports = new WorkerService();