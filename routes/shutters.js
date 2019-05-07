const express = require('express');
const router = express.Router();
const shutterService = require('../services/shutterService');

router.get('/', (req, res) => {
    req.url = '/list';
    router.handle(req, res);
});

router.get('/list', (req, res) => {
    shutterService.listShutters(shutters => {
        res.status(200).send(shutters);
    });
});

module.exports = router;