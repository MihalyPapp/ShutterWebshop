const express = require('express');
const router = express.Router();
const WorkerService = require('../services/WorkerService');
const workerService = new WorkerService();

router.get('/orders/details/list', (req, res) => {
    workerService.listOrders(response => {
        res.status(200).send(response);
    });
});

router.get('/order/parameters/list/:_id', (req, res) => {
    workerService.listOrderParameters(req.params._id, response => {
        res.status(200).send(response);
    });
});

router.post('/order/update', (req, res) => {
    workerService.updateOrder(req.body, response => {
        res.status(200).send(response);
    });
});

module.exports = router;