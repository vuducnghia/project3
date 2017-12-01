var express = require('express');
var router = express.Router();
var storeController = require('../controllers/Store.controller');

router.post('/timkiemcuahang', storeController.findStoreByName);

module.exports = router;
