const mocha = require('mocha');
const describe = mocha.describe;
const chai = require('chai');
const assert = chai.assert;

const CustomerService = require('../services/CustomerService');

describe('Customer Service Test', function() {
    it('List orders of a given user from mongoDB', function() {
        const service = new CustomerService();
        service.listOrder('testUser01', () => {})
    });

    it('Check the correct order format!', function() {
        const service = new CustomerService();
        const order = {
            username: 'testUser01',
            email: 'testmail@gmail.com',
            address: '12345 Main st.',
            city: 'New York',
            state: 'New York',
            zip: '12542',
            installationDate: '2019-05-11T21:24:15.197Z',
            price: 52140,
            cartItems: [
                {
                    shutter: {
                        _id: 5,
                        name: 'Redextra shutter with brown sheath',
                        partNo: 'T-sw-45-0005',
                        price: 8600,
                        imgName: '05',

                    },
                    parameters: {
                        width: 120,
                        height: 200,
                        slat: 'wooden'
                    },
                    quantity: 1,
                    price: 25000
                },
                {
                    shutter: {
                        _id: 6,
                        name: 'Redextra shutter with white sheath',
                        partNo: 'T-sw-45-0010',
                        price: 9000,
                        imgName: '07',

                    },
                    parameters: {
                        width: 205,
                        height: 200,
                        slat: 'white'
                    },
                    quantity: 4,
                    price: 60000
                }

            ]

        };
        assert.strictEqual(service.isValidOrder(order), true);
    });

    it('Check the order format when fields are empty!', function() {
        const service = new CustomerService();
        const order = {
            username: 'testUser01',
            email: 'testmail@gmail.com',
            address: '12345 Main st.',
            city: 'New York',
            state: 'New York',
            zip: '12542',
            installationDate: '',
            price: 52140,
            cartItems: [
                {
                    shutter: {
                        _id: 5,
                        name: 'Redextra shutter with brown sheath',
                        partNo: 'T-sw-45-0005',
                        price: 8600,
                        imgName: '05',

                    },
                    parameters: {
                        width: 120,
                        height: 200,
                        slat: 'wooden'
                    },
                    quantity: 1,
                    price: 25000
                },
                {
                    shutter: {
                        _id: 6,
                        name: 'Redextra shutter with white sheath',
                        partNo: 'T-sw-45-0010',
                        price: 9000,
                        imgName: '',

                    },
                    parameters: {
                        width: 205,
                        height: 200,
                        slat: ''
                    },
                    quantity: 4,
                    price: 60000
                }

            ]

        };
        assert.strictEqual(service.isValidOrder(order), false);
    });

    it('List orders from own object', function() {
        const dao = {
            insertOrder: function(){},
            findOrder: function(username, callback) {
                callback({
                    _id: '5cd72289c20fb85acad23423',
                    cartItems: [{},{}],
                    email: 'testemail@gmail.com',
                    address: 'Main st. 2165',
                    city: 'New York',
                    state: 'New York',
                    zip: '256116',
                    installationDate: '2019-05-11T19:29:11.226Z',
                    username: 'testUser051',
                    price: 48553,
                    date: 'Sat May 11 2019 21:29:13 GMT+0200 (Central European Summer Time)',
                    status: 'ASSEMBLED',
                    workerUsername: 'test'
                });

            }
        };
        const service = new CustomerService(dao);
        service.listOrder('testUser51', callback => {
            console.log(callback);
        })
    });

    it('List orders test mocked API called once', function() {
        const dao = {
            insertOrder: function(){},
            findOrder: function(username, callback) {
                callback({
                    _id: '5cd72289c20fb85acad23423',
                    cartItems: [{},{}],
                    email: 'testemail@gmail.com',
                    address: 'Main st. 2165',
                    city: 'New York',
                    state: 'New York',
                    zip: '256116',
                    installationDate: '2019-05-11T19:29:11.226Z',
                    username: 'testUser051',
                    price: 48553,
                    date: 'Sat May 11 2019 21:29:13 GMT+0200 (Central European Summer Time)',
                    status: 'ASSEMBLED',
                    workerUsername: 'test'
                });

            }
        };
        const service = new CustomerService(dao);
        service.listOrder('testUser51', callback => {
            console.log(callback);
        })
    });
});