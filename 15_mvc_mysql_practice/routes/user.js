const express = require('express');
const router = express.Router();
const controller = require('../controller/Cuser');

//GET localhost:8000/user/
router.get('/', controller.index);
//signup
router.get('/signup', controller.signup);
//signup POST
router.post('/signup', controller.post_signup);
//signin
router.get('/signin', controller.signin);
//signin POST
router.post('/signin', controller.post_signin);
//profile
router.post('/profile', controller.post_profile);
router.patch('/profile/edit', controller.edit_profile);
router.delete('/profile/delete', controller.edit_profile);
module.exports = router;
