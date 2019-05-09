const express = require('express');
const router = express.Router();
const workerService = require('../services/WorkerService');

router.get('/orders/list', (req, res) => {
    console.log("herjó");
    workerService.listOrders(response => {
        res.status(200).send(response);
    });
});


module.exports = router;