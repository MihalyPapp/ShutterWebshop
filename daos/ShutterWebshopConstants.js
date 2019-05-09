module.exports = {
    dbName: 'shutter-webshop',
    collections: {
        shutters: {
            collectionName: 'shutters',
            _id: '_id',
            name: 'name',
            partNo: 'partNo',
            slats: 'slats',
            price: 'price'
        },
        orders: {
            collectionName: 'orders',
            _id: '_id',
            cartItems: 'cartItems',
            infos: {
                objectName: 'infos',
                email: 'email',
                address: 'address',
                city: 'city',
                State: 'state',
                Zip: 'zip'
            },
            username: 'username',
            price: 'price',
            date: 'date',
            status: 'status'
        }
    }
};