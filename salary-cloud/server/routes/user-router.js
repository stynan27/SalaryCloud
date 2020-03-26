const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();

router.post('/createUser', UserCtrl.createUser);
router.put('/updateUser/:id', UserCtrl.updateUser);
router.delete('/deleteUser/:id', UserCtrl.deleteUser);
router.get('/getUser/:id', UserCtrl.getUserById);
router.get('/getUsers', UserCtrl.getUsers);

module.exports = router;
