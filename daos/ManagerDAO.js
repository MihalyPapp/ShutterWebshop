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

    findSlatsStatistics(callback) {
        const client = MongoClient(url);
        client.connect((err) => {
            if(err != null) {
                console.log(err);
                callback([])
            }

            const db = client.db(ShutterWebshopConstants.dbName);
            const orders = db.collection(ShutterWebshopConstants.collections.orders.collectionName);
            const status = ShutterWebshopConstants.collections.orders.status;

            let hazelnut = 0;
            let wooden = 0;
            let grey = 0;
            let butter = 0;
            let coffee = 0;

            const promise1 = orders.find({'cartItems.parameters.slat': 'hazelnut'}).count().then(result => {hazelnut = result});
            const promise2 = orders.find({'cartItems.parameters.slat': 'wooden'}).count().then(result => {wooden = result});
            const promise3 = orders.find({'cartItems.parameters.slat': 'grey'}).count().then(result => {grey = result});
            const promise4 = orders.find({'cartItems.parameters.slat': 'butter'}).count().then(result => {butter = result});
            const promise5 = orders.find({'cartItems.parameters.slat': 'coffee'}).count().then(result => {coffee = result});

            Promise.all([promise1, promise2, promise3, promise4, promise5]).then(() => {
                callback([
                    {title: 'hazelnut', value: hazelnut, color: '#E38627'},
                    {title: 'wooden', value: wooden, color: '#60472C'},
                    {title: 'grey', value: grey, color: '#A39D97'},
                    {title: 'butter', value: butter, color: '#FFC07C'},
                    {title: 'coffee', value: coffee, color: '#472909'}
                ]);
            });
        });
    }
}

module.exports = new ManagerDAO;