var express = require('express');
var controller = require('./houses.controller');
var router = express.Router();

router.post('/', controller.addHouse);
router.get('/getHouses', controller.getHouses);
router.get('/housesList', controller.getHousesList);
router.get('/:houseID', controller.getHouseDetails);
router.put('/:houseID', controller.updateHouse);

module.exports = router;
