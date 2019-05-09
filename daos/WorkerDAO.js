const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const assert = require('assert');
const ShutterWebshopConstants = require('./ShutterWebshopConstants');

const url = 'mongodb://172.21.0.10:27017';

class WorkerDAO {

    findOrder(callback) {
        const client = MongoClient(url);
        client.connect((err) => {
            if(err != null) {
                console.log(err);
                callback([])
            }

            const db = client.db(ShutterWebshopConstants.dbName);
            const orders = db.collection(ShutterWebshopConstants.collections.orders.collectionName);

            const status = ShutterWebshopConstants.collections.orders.status;
            const username = ShutterWebshopConstants.collections.orders.username;
            const date = ShutterWebshopConstants.collections.orders.date;

            orders.find({[status] : 'WAITING_FOR_ASSEMBLE'}).project({[username]: 1, [date]: 1}).toArray((err, docs) => {
                assert.equal(err, null);
                callback(docs);
            })
        });
    }

    findOrderParameters(_id, callback) {
        const client = MongoClient(url);
        client.connect((err) => {
            if(err != null) {
                console.log(err);
                callback([])
            }

            const db = client.db(ShutterWebshopConstants.dbName);
            const orders = db.collection(ShutterWebshopConstants.collections.orders.collectionName);
            const id = ShutterWebshopConstants.collections.orders._id;
            const cartItems = ShutterWebshopConstants.collections.orders.cartItems.arrayName;
            const parameters = ShutterWebshopConstants.collections.orders.cartItems.parameters.objectName;
            const shutter = ShutterWebshopConstants.collections.orders.cartItems.shutter.objectName;
            const partNo = ShutterWebshopConstants.collections.orders.cartItems.shutter.partNo;
            const quantity = ShutterWebshopConstants.collections.orders.cartItems.quantity;

            orders.find({[id] : ObjectId(_id)}).project({
                [cartItems+'.'+parameters]: 1,
                [cartItems+'.'+shutter+'.'+partNo]: 1,
                [cartItems+'.'+quantity]: 1,
            }).toArray((err, docs) => {
                assert.equal(err, null);
                callback(docs);
            })
        });
    }

    updateOrder(data, callback) {
        const client = MongoClient(url);
        client.connect((err) => {
            if(err != null) {
                console.log(err);
                callback([])
            }

            const db = client.db(ShutterWebshopConstants.dbName);
            const orders = db.collection(ShutterWebshopConstants.collections.orders.collectionName);
            const id = ShutterWebshopConstants.collections.orders._id;
            const status = ShutterWebshopConstants.collections.orders.status;
            const workerUsername = ShutterWebshopConstants.collections.orders.workerUsername;

            orders.updateOne({[id]: ObjectId(data._id)}, {"$set": {[status]: data.status, [workerUsername]: data.username}})
                .then(result => {
                    callback(result);
                })
        });
    }
}

module.exports = new WorkerDAO;