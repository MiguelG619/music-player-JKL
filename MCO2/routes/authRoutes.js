const express = require('express');
const signUpController = require('../controllers/signUpController');
const logInController = require('../controllers/logInController');
const router = express.Router();


router.get('/', signUpController.getIndex);
router.post('/signUp', signUpController.postSignUp);
router.get('/logIn', logInController.getLogIn);
router.post('/logIn', logInController.postLogIn);
router.get('logoOut', logInController.getLogOut);

module.exports = router;