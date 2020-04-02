const express = require('express');

const AnonUserCtrl = require('../controllers/anon-user-ctrl');

const router = express.Router();

router.post('/create', AnonUserCtrl.createAnonUser);
router.put('/update/:id', AnonUserCtrl.updateAnonUser);
router.delete('/delete/:id', AnonUserCtrl.deleteAnonUser);
router.get('/get/:id', AnonUserCtrl.getAnonUserById);
router.get('/getAll', AnonUserCtrl.getAnonUsers);

module.exports = router;