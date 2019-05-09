function CustomerService() {
    this.customerDao = require('../daos/CustomerDAO');
}

CustomerService.prototype.addOrder = function(order, callback) {
    order['date'] = new Date().toString();
    order['status']  = 'WAITING_FOR_ASSEMBLY';
    this.customerDao.insertOrder(order, callback);
};

CustomerService.prototype.listOrderByUsername = function(username, callback) {
    this.customerDao.findOrderByUsername(username, callback);
};


module.exports = new CustomerService();