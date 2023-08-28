const { User } = require('../models');
const bcrypt = require('bcrypt');

const cookieConfig = {
  httpOnly: true,
  maxAge: 60 * 1000,
};
//GET
exports.main = (req, res) => {
  if (!req.cookies.isLogin) {
    res.render('index', { cookie: false });
  } else {
    res.render('index', { cookie: true });
  }
};
exports.signup = (req, res) => {
  res.render('signup');
};
exports.signin = (req, res) => {
  console.log(req.session.userInfo);
  if (req.session.userInfo) {
    res.redirect(`/profile/${req.session.userInfo.id}`);
  } else {
    res.render('signin');
  }
};
exports.profile = (req, res) => {
  console.log(req.params);
  console.log(req.session.userInfo, req.sessionID);
  User.findOne({
    where: { id: req.params.init },
  }).then((result) => {
    res.render('profile', { data: result });
  });
};
exports.all = (req, res) => {
  if (req.session.userInfo) {
    User.findAll().then((result) => {
      res.render('members', { name: req.session.userInfo.name, result });
    });
  } else {
    res.redirect('/signin');
  }
};
//POST
exports.post_signup = async (req, res) => {
  const { userid, name, pw } = req.body;
  const hash = await bcryptPassword(pw);
  User.create({
    userid,
    name,
    pw: hash,
  }).then(() => {
    res.json({ result: true });
  });
};
exports.post_signin = async (req, res) => {
  const { userid, pw } = req.body;
  const user = await User.findOne({
    where: { userid: userid },
  });
  if (user) {
    const result = await compareFunc(pw, user.pw);
    if (result) {
      res.cookie('isLogin', true, cookieConfig);
      req.session.userInfo = { name: user.name, id: user.id };
      res.json({ result: true, data: user });
    } else {
      res.json({ result: false, message: '비밀번호가 틀렸습니다.' });
    }
  } else {
    res.json({ result: false, message: '존재하는 사용자가 없습니다.' });
  }
};

//PATCH
exports.edit_profile = (req, res) => {
  const { name, pw, id } = req.body;
  User.update({ name, pw }, { where: { id } }).then(() => {
    res.json({ result: true });
  });
};

//DELETE
exports.destroy = (req, res) => {
  const { id } = req.body;
  User.destroy({
    where: { id },
  }).then(() => {
    res.clearCookie('testCookie');
    req.session.destroy();
    res.json({ result: true });
  });
};

//암호화
const bcryptPassword = (password) => bcrypt.hash(password, 11);
const compareFunc = (password, dbpass) => bcrypt.compare(password, dbpass);
