function CustomerService() {
    this.customerDao = require('../daos/CustomerDAO');
}

CustomerService.prototype.addOrder = function(order, callback) {
    order['date'] = new Date().toString();
    order['status']  = 'WAITING';
    this.customerDao.insertOrder(order, callback);
};

CustomerService.prototype.listOrder = function(username, callback) {
    this.customerDao.findOrder(username, callback);
};


module.exports = new CustomerService();