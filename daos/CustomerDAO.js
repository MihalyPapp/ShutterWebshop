const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ShutterWebshopConstants = require('./ShutterWebshopConstants');

const url = 'mongodb://172.21.0.10:27017';

class CustomerDAO {

    insertOrder(order, callback) {
        const client = MongoClient(url);
        client.connect((err) => {
            if(err != null) {
                console.log(err);
                callback([]);
            }

            const db = client.db(ShutterWebshopConstants.dbName);
            const orders = db.collection(ShutterWebshopConstants.collections.orders.collectionName);

            orders.insertOne(order, (err, result) => {
                assert.equal(err, null);
                assert.equal(1, result.ops.length);
                callback(result);
            });

        })
    }

    findOrder(username, callback) {
        const client = MongoClient(url);
        client.connect((err) => {
            if(err != null) {
                console.log(err);
                callback([])
            }

            const db = client.db(ShutterWebshopConstants.dbName);
            const orders = db.collection(ShutterWebshopConstants.collections.orders.collectionName);
            const _username = ShutterWebshopConstants.collections.orders.username;

            orders.find({[_username]: username}).toArray((err, docs) => {
                assert.equal(err, null);
                console.log(docs)
                callback(docs);
            })
        });
    }
}

module.exports = new CustomerDAO;