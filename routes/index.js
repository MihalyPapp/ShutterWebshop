const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.status(200).render('index',{title: 'Shutter Webshop'});
});

router.get('/images/:imageName', (req, res) => {
    console.log('/images/'+req.params.imageName);
    res.status(200).sendFile(path.join(__dirname, '../images/'+req.params.imageName));
});

module.exports = router;