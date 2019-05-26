var express = require('express');
var router = express.Router();

var db = require('./queries');


router.get('/api/acara', db.getAllAcara);
// router.get('/api/acara/:id', db.getSingleAcara);
// router.post('/api/acara', db.createAcara);
// router.put('/api/acara/:id', db.updateAcara);
// router.delete('/api/acara/:id', db.removeAcara);


module.exports = router;