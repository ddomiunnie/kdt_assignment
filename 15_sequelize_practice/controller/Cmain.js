const { User } = require('../models');
const bcrypt = require('bcrypt');

//GET
exports.main = (req, res) => {
  res.render('index');
};
exports.signup = (req, res) => {
  res.render('signup');
};
exports.signin = (req, res) => {
  res.render('signin');
};
exports.profile = (req, res) => {
  console.log(req.params);
  User.findOne({
    where: { id: req.params.init },
  }).then((result) => {
    res.render('profile', { data: result });
  });
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
    res.json({ reuslt: true });
  });
};

//DELETE
exports.destroy = (req, res) => {
  const { id } = req.body;
  User.destroy({
    where: { id },
  }).then(() => {
    res.json({ result: true });
  });
};

//암호화
const bcryptPassword = (password) => bcrypt.hash(password, 11);
const compareFunc = (password, dbpass) => bcrypt.compare(password, dbpass);
