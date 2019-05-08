const express = require('express');
const router = express.Router();
const shutterService = require('../services/shutterService');

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

router.get('/:_id', (req, res) => {
    req.url = `/list/${req.params._id}`;
    router.handle(req, res);
});

router.get('/', (req, res) => {
    req.url = '/list';
    router.handle(req, res);
});

module.exports = router;