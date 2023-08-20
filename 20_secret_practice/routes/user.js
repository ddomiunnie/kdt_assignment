const express = require('express');
const router = express.Router();
const controller = require('../controller/user');

router.get('/', controller.index);
router.get('/register', controller.get_register);
router.get('/login', controller.get_login);
//register
router.post('/register', controller.register);
//login
router.post('/login', controller.login);

module.exports = router;
