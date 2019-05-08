const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');

router.post('/add', (req, res) => {
    console.log(req.body);
    orderService.insertCustomerOrder(req.body, response => {
       res.status(200).send(response);
    });
});

module.exports = router;