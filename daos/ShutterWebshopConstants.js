module.exports = {
    dbName: 'shutter-webshop',
    collections: {
        shutters: {
            collectionName: 'shutters',
            _id: '_id',
            name: 'name',
            partNo: 'partNo',
            slats: 'slats'
        },
        orders: {
            collectionName: 'orders',
            _id: '_id',
            cartItems: 'cartItems',
            infos: {
                objectName: 'infos',
                username: 'username',
                email: 'email',
                address: 'address',
                city: 'city',
                State: 'state',
                Zip: 'zip'
            },
            date: 'date',
            status: 'status'
        }
    }
};