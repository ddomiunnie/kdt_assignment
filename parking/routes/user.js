const express = require('express');
const router = express.Router();
const controller = require('../controller/Cuser');

router.get('/login', controller.login); //로그인
router.post('/login', controller.postLogin);

router.get('/signup', controller.signup); //회원가입
router.post('/signup', controller.postSignup);

router.get('/verify', controller.verify); //전화번호 인증

router.get('/:userid/:nickname/success', controller.success); //회원가입 성공

router.get('/user/:userid/edit', controller.edit); //회원정보 수정
router.patch('/edit', controller.editProfile);

router.delete('/drop', controller.drop); //회원 탈퇴
module.exports = router;
