const express = require('express');
const signUpController = require('../controllers/signUpController');
const logInController = require('../controllers/logInController');
const router = express.Router();

router.get('/', logInController.getLogIn);
router.get('/signUp', signUpController.getSignUp);
router.post('/signUp', signUpController.postSignUp);
router.post('/logIn', logInController.postLogIn);
router.get('/logOut', logInController.getLogOut);

module.exports = router;