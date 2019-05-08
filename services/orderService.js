function OrderService() {
    this.orderDAO = require('../daos/OrderDAO');
}

OrderService.prototype.insertCustomerOrder = function(order, callback) {
    order['date'] = new Date().toString();

    this.orderDAO.insertCustomerOrder(order, callback);
};


module.exports = new OrderService();