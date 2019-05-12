function CustomerService(CustomerDAO) {
    if(CustomerDAO !== undefined && CustomerDAO !== null) {
        this.customerDao = CustomerDAO;
    } else {
        this.customerDao = require('../daos/CustomerDAO');
    }

    this.isValidOrder = function(order) {
        if(order === undefined) {
            console.log("Order is undefined.");
            return false;
        }

        if(order.username === undefined || order.username === "") {
            console.log("Username is not defined.");
            return false;
        }

        if(order.email === undefined || order.email === "") {
            console.log("Email is not defined.");
            return false;
        }

        if(order.address === undefined || order.address === "") {
            console.log("Address is not defined.");
            return false;
        }

        if(order.city === undefined || order.city === "") {
            console.log("City is not defined.");
            return false;
        }

        if(order.zip === undefined || order.zip === "") {
            console.log("Zip is not defined.");
            return false;
        }

        if(order.installationDate === undefined || order.installationDate === "") {
            console.log("Installation date is not defined.");
            return false;
        }

        if(order.price === undefined || order.installationDate === "") {
            console.log("Price is not defined.");
            return false;
        }

        if(order.cartItems === undefined || order.cartItems.length < 1) {
            console.log("Cart items is not defined.");
            return false;
        }

        for(let i = 0; i < order.cartItems.length; i++) {
            if(order.cartItems[i].shutter.name === undefined || order.cartItems[i].shutter.name === "") {
                console.log("Shutter name is not defined");
                return false;
            }

            if(order.cartItems[i].shutter.partNo === undefined || order.cartItems[i].shutter.partNo === "") {
                console.log("Shutter part number is not defined");
                return false;
            }

            if(order.cartItems[i].shutter.price === undefined || order.cartItems[i].shutter.price === "") {
                console.log("Shutter price is not defined");
                return false;
            }

            if(order.cartItems[i].shutter.imgName === undefined || order.cartItems[i].shutter.imgName === "") {
                console.log("Shutter image name is not defined");
                return false;
            }

            if(order.cartItems[i].parameters.width === undefined || order.cartItems[i].parameters.width === "") {
                console.log("Shutter width is not defined");
                return false;
            }

            if(order.cartItems[i].parameters.height === undefined || order.cartItems[i].parameters.height === "") {
                console.log("Shutter height is not defined");
                return false;
            }

            if(order.cartItems[i].parameters.slat === undefined || order.cartItems[i].parameters.slat === "") {
                console.log("Shutter slat is not defined");
                return false;
            }

            if(order.cartItems[i].quantity === undefined || order.cartItems[i].quantity === "") {
                console.log("Cart-item quantity is not defined");
                return false;
            }

            if(order.cartItems[i].price === undefined || order.cartItems[i].price === "") {
                console.log("Cart-item price is not defined");
                return false;
            }
        }

        return true;
    }
}

CustomerService.prototype.addOrder = function(order, callback) {
    if(this.isValidOrder(order)) {
        order['date'] = new Date().toString();
        order['status']  = 'WAITING';
        this.customerDao.insertOrder(order, response => {
            callback(response);
        });
    } else {
        callback({ok: 0});
    }
};

CustomerService.prototype.listOrder = function(username, callback) {
    this.customerDao.findOrder(username, callback);
};


module.exports = CustomerService;