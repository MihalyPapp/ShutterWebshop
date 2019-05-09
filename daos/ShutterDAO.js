const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const assert = require('assert');
const ShutterWebshopConstants = require('./ShutterWebshopConstants');

const url = 'mongodb://172.21.0.10:27017';

class ShutterDAO {

    findShutters(callback) {
        const client = MongoClient(url);
        client.connect((err) => {
            if(err != null) {
                console.log(err);
                callback([]);
            }

            const db = client.db(ShutterWebshopConstants.dbName);
            const shutters = db.collection(ShutterWebshopConstants.collections.shutters.collectionName);

            const shutterName = ShutterWebshopConstants.collections.shutters.name;
            const shutterPrice = ShutterWebshopConstants.collections.shutters.price;

            shutters.find().project({[shutterName]: 1, [shutterPrice]: 1}).toArray((err, docs) => {
                assert.equal(err, null);
                callback(docs);
            });
        });
    }

    findShuttersById(_id, callback) {
        const client = MongoClient(url);
        client.connect((err) => {
            if(err != null) {
                console.log(err);
                callback([]);
            }

            const db = client.db(ShutterWebshopConstants.dbName);
            const shutters = db.collection(ShutterWebshopConstants.collections.shutters.collectionName);
            const id = ShutterWebshopConstants.collections.shutters._id;

            shutters.find({[id]: _id}).toArray((err, docs) => {
                assert.equal(err, null);
                callback(docs);
            });
        });
    }
}

module.exports = new ShutterDAO;