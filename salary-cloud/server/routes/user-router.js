const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();

router.post('/create', UserCtrl.createUser);
router.put('/updateEmail/:id', UserCtrl.updateUserEmail);
router.put('/updatePassword/:id/:anonId', UserCtrl.updateUserPassword);
router.put('/updateAnon/:anonId', UserCtrl.updateAnonUser);
router.delete('/delete/:id/:anonId', UserCtrl.deleteUserByIds);
router.get('/getUser/:id', UserCtrl.getUserById);
router.get('/getAnon/:anonId', UserCtrl.getAnonUserByAnonId);
router.post('/login', UserCtrl.getIdsOnLogin);
router.get('/getAll', UserCtrl.getUsers);

module.exports = router;
