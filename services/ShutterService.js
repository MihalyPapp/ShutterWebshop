function ShutterService() {
    this.shutterDAO = require('../daos/ShutterDAO');
}

ShutterService.prototype.listShutters = function(callback) {
    this.shutterDAO.findShutters(callback);
};

ShutterService.prototype.listShuttersById = function(_id, callback) {
    this.shutterDAO.findShuttersById(_id, callback);
};

module.exports = new ShutterService();