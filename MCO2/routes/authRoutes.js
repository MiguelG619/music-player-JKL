const express = require('express');
const signUpController = require('../controllers/signUpController');
const logInController = require('../controllers/logInController');
const router = express.Router();



router.get('/signup', signUpController.getSignUp);
router.post('/signup', signUpController.postSignUp);
router.get('/login', logInController.getLogIn);
router.post('/login', logInController.postLogIn);
router.get('logout', logInController.getLogOut);

module.exports = router;