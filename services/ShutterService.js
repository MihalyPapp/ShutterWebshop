function ShutterService() {
    this.shutterDAO = require('../daos/ShutterDAO');
}

ShutterService.prototype.listShuttersDetails = function(callback) {
    this.shutterDAO.findShuttersDetails(callback);
};

ShutterService.prototype.listShuttersById = function(_id, callback) {
    this.shutterDAO.findShuttersById(_id, callback);
};

module.exports = new ShutterService();