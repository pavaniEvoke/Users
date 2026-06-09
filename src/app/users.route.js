var express = require('express');
var controller = require('./users.controller');
var router = express.Router();

router.post('/',controller.addUser);
router.get('/getUsers',controller.getUsers);
router.get('/:userID',controller.getUserDetails);
router.put('/:userID',controller.updateUser);
router.get('/usersList',controller.getUsersList);


module.exports = router;