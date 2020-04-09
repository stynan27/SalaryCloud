const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();

router.post('/create', UserCtrl.createUser);
router.put('/updateEmail/:id', UserCtrl.updateUserEmail);
router.put('/updatePassword/:id', UserCtrl.updateUserPassword);
router.put('/updateAnon', UserCtrl.updateAnonUser);
router.delete('/delete/:id', UserCtrl.deleteUser);
router.get('/get/:id', UserCtrl.getUserById);
router.get('/getAnon', UserCtrl.getAnonUserById);
router.get('/getAll', UserCtrl.getUsers);

module.exports = router;
