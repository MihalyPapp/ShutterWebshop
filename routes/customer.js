const express = require('express');
const router = express.Router();
const orderService = require('../services/CustomerService');

router.post('/order/add', (req, res) => {
    orderService.addOrder(req.body, response => {
       res.status(200).send(response);
    });
});

router.get('/orders/list/:username', (req, res) => {
    orderService.listOrderByUsername(req.params.username, response => {
       res.status(200).send(response);
    });
});

module.exports = router;