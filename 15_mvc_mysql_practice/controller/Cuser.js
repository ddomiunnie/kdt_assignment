const User = require('../model/User');

exports.index = (req, res) => {
  res.render('index');
};
//회원가입
exports.signup = (req, res) => {
  res.render('signup');
};

exports.post_signup = (req, res) => {
  User.post_signup(req.body, () => {
    res.send({ result: true });
  });
};
//로그인
exports.signin = (req, res) => {
  res.render('signin');
};

exports.post_signin = (req, res) => {
  User.post_signin(req.body, (result) => {
    console.log(result);
    if (result.length > 0) {
      res.send({ result: true, data: result[0] });
    } else {
      res.send({ result: false, data: null });
    }
  });
};
//profile
exports.post_profile = (req, res) => {
  console.log(req.body);
  User.post_profile(req.body, (result) => {
    if (result.length > 0) {
      res.render('profile', { data: result[0] });
    } else {
      res.redirect('/user/signin');
    }
  });
};
exports.edit_profile = (req, res) => {
  console.log(req.body);
  User.edit_profile(req.body, () => {
    res.send({ result: true });
  });
};
exports.delete_profile = (req, res) => {
  User.delete_profile(req.body.id, () => {
    res.send({ result: true });
  });
};
