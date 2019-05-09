const express = require('express');
const router = express.Router();
const shutterService = require('../services/ShutterService');

router.get('/list/:_id', (req, res) => {
    shutterService.listShuttersById(req.params._id, shutter => {
        res.status(200).send(shutter);
    });
});

router.get('/list', (req, res) => {
    shutterService.listShutters(shutters => {
        res.status(200).send(shutters);
    });
});


module.exports = router;