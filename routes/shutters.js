const express = require('express');
const router = express.Router();
const shutterService = require('../services/shutterService');

router.get('/', (req, res) => {
    res.status(200).render('index',{title: 'Shutter Webshop'})
});

router.get('/list', (req, res) => {
    shutterService.listShutters(shutters => {
        res.status(200).send(shutters);
    });
});

module.exports = router;