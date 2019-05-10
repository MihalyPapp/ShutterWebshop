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
            cartItems: {
                arrayName: 'cartItems',
                parameters: {
                    objectName: 'parameters',
                    width: 'width',
                    height: 'height',
                    slat: 'slat'
                },
                shutter: {
                    objectName: 'shutter',
                    _id: '_id',
                    name: 'name',
                    partNo: 'partNo',
                    slats: 'slats',
                    price: 'price'
                },
                price: 'price',
                quantity: 'quantity'
            },
            email: 'email',
            address: 'address',
            city: 'city',
            State: 'state',
            Zip: 'zip',
            username: 'username',
            price: 'price',
            date: 'date',
            status: 'status',
            workerUsername: 'workerUsername'
        }
    }
};