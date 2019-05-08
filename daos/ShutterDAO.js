const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const assert = require('assert');
const ShutterWebshopConstants = require('./ShutterWebshopConstants');

const url = 'mongodb://172.21.0.10:27017';

class ShutterDAO {

    readShutters(callback) {
        const client = MongoClient(url);
        client.connect((err) => {
            if(err != null) {
                console.log(err);
                callback([]);
            }
            const db = client.db(ShutterWebshopConstants.dbName);
            const shutters = db.collection(ShutterWebshopConstants.collections.shutters.collectionName);

            shutters.find().toArray((err, docs) => {
                assert.equal(err, null);
                callback(docs);
            });
        });
    }

    readShuttersById(_id, callback) {
        const client = MongoClient(url);
        client.connect((err) => {
            if(err != null) {
                console.log(err);
                callback([]);
            }
            const db = client.db(ShutterWebshopConstants.dbName);
            const shutters = db.collection(ShutterWebshopConstants.collections.shutters.collectionName);
            shutters.find({_id: _id}).toArray((err, docs) => {
                assert.equal(err, null);
                callback(docs);
            });
        });
    }
}

module.exports = new ShutterDAO;