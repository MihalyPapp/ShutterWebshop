const express = require('express');
const router = express.Router();
const ShutterService = require('../services/ShutterService');
const shutterService = new ShutterService();

router.get('/list/:_id', (req, res) => {
    shutterService.listShuttersById(req.params._id, shutter => {
        res.status(200).send(shutter);
    });
});

router.get('/details/list', (req, res) => {
    shutterService.listShuttersDetails(shutters => {
        res.status(200).send(shutters);
    });
});


module.exports = router;