function WorkerService() {
    this.workerDAO = require('../daos/WorkerDAO');
}

WorkerService.prototype.listOrders = function(callback) {
    this.workerDAO.findOrder(callback);
};

WorkerService.prototype.listOrderParameters = function(_id, callback) {
    this.workerDAO.findOrderParameters(_id, callback);
};

module.exports = new WorkerService();