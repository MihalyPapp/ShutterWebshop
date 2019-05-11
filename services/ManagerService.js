function ManagerService() {
    this.managerDAO = require('../daos/ManagerDAO');
}

ManagerService.prototype.listOrdersDetails = function(callback) {
    this.managerDAO.findOrdersDetails(callback);
};

ManagerService.prototype.listOrder = function(_id, callback) {
    this.managerDAO.findOrder(_id, result => {
        callback(result);
    });
};



module.exports = new ManagerService();