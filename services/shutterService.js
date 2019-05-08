function ShutterService() {
    this.shutterDAO = require('../daos/ShutterDAO');
}

ShutterService.prototype.listShutters = function(callback) {
    this.shutterDAO.readShutters(callback);
};

ShutterService.prototype.listShuttersById = function(_id, callback) {
    this.shutterDAO.readShuttersById(_id, callback);
};

module.exports = new ShutterService();