const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');

router.post('/add', (req, res) => {
    orderService.insertCustomerOrder(req.body, response => {
       res.status(200).send(response);
    });
});

router.get('/user/:username', (req, res) => {
    orderService.findOrderByUsername(req.params.username, response => {
       res.status(200).send(response);
    });
    console.log(req.params.username);
});

module.exports = router;