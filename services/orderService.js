function OrderService() {
    this.orderDAO = require('../daos/OrderDAO');
}

OrderService.prototype.insertCustomerOrder = function(order, callback) {
    order['date'] = new Date().toString();
    order['status']  = 'ON_PROGRESS';
    this.orderDAO.insertCustomerOrder(order, callback);
};

OrderService.prototype.findOrderByUsername = function(username, callback) {
    this.orderDAO.findOrderByUsername(username, callback);
};


module.exports = new OrderService();