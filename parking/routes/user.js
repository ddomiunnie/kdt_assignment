const express = require('express');
const router = express.Router();
const controller = require('../controller/Cuser');

router.get('/login', controller.login); //로그인
router.post('/login', controller.post_login);

router.get('/signup', controller.signup); //회원가입
router.post('/signup', controller.post_signup);

router.get('/success', controller.success); //회원가입 성공
module.exports = router;
