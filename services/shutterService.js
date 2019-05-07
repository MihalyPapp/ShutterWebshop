function ShutterService() {
    this.shutterDAO = require('../daos/ShutterDAO');
}

ShutterService.prototype.listShutters = function(callback) {
    this.shutterDAO.readShutters(callback);
};

module.exports = new ShutterService();