function WorkerService() {
    this.workerDAO = require('../daos/WorkerDAO');
}

WorkerService.prototype.listOrders = function(callback) {
    this.workerDAO.findOrder(callback);
};

module.exports = new WorkerService();