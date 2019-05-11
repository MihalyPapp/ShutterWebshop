const express = require('express');
const router = express.Router();
const managerService = require('../services/ManagerService');

router.get('/orders/details/list', (req, res) => {
    managerService.listOrdersDetails(response => {
        res.status(200).send(response);
    });
});

router.get('/order/list/:_id', (req, res) => {
    managerService.listOrder(req.params._id, response => {
        res.status(200).send(response);
    });
});

module.exports = router;