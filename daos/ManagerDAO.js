const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const assert = require('assert');
const ShutterWebshopConstants = require('./ShutterWebshopConstants');

const url = 'mongodb://172.21.0.10:27017';

class ManagerDAO {

    findOrdersDetails(callback) {
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
            const workerUsername = ShutterWebshopConstants.collections.orders.workerUsername;

            orders.find({}).project({[username]: 1, [date]: 1, [status]: 1, [workerUsername]: 1}).toArray((err, docs) => {
                assert.equal(err, null);
                callback(docs);
            })
        });
    }

    findOrder(_id, callback) {
        const client = MongoClient(url);
        client.connect((err) => {
            if(err != null) {
                console.log(err);
                callback([])
            }

            const db = client.db(ShutterWebshopConstants.dbName);
            const orders = db.collection(ShutterWebshopConstants.collections.orders.collectionName);
            const id = ShutterWebshopConstants.collections.orders._id;

            orders.find({[id] : ObjectId(_id)}).toArray((err, docs) => {
                assert.equal(err, null);
                callback(docs);
            })
        });
    }
}

module.exports = new ManagerDAO;