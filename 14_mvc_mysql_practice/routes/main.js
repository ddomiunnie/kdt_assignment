const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');

router.get('/', controller.main);
//회원가입
router.get('/signup', controller.signup);
router.post('/signup', controller.post_signup);
//로그인
router.get('/signin', controller.signin);
router.post('/signin', controller.post_signin);
//회원정보 조회
router.get('/profile/:init', controller.profile);
//수정
router.patch('/profile/edit', controller.edit_profile);

module.exports = router;
