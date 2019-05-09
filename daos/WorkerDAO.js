const MongoClient = require('mongodb').MongoClient;
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
}

module.exports = new WorkerDAO;