module.exports = {
    dbName: 'shutter-webshop',
    collections: {
        shutters: {
            collectionName: 'shutters',
            _id: '_id',
            name: 'Name',
            partNo: 'Part number',
            slats: 'Slats'
        },
        orders: {
            collectionName: 'orders',
            _id: 'Object Id',
            cartItems: 'Cart Items',
            infos: {
                username: 'Username',
                email: 'Email',
                address: 'Address',
                city: 'City',
                State: 'State',
                Zip: 'Zip Code'
            },
            status: 'Status',
            date: 'Date'
        }
    }
};