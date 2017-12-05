var express = require('express');
var router = express.Router();
var storeController = require('../controllers/Store.controller');

router.post('/timkiemcuahang', storeController.findStoreByName);
router.post('/xem-thong-tin-cua-hang', storeController.getStoreInfo);

module.exports = router;
