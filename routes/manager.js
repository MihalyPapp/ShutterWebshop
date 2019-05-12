const express = require('express');
const router = express.Router();
const ManagerService = require('../services/ManagerService');
const managerService = new ManagerService();

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

router.get('/statistics/slats/', (req, res) => {
    managerService.getSlatsStatistics(response => {
        res.status(200).send(response);
    });
});

module.exports = router;