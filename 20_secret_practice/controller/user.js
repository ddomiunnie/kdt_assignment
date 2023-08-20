const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.index = (req, res) => {
  res.render('index');
};
exports.get_register = (req, res) => {
  res.render('register');
};
exports.get_login = (req, res) => {
  res.render('login');
};

//register
exports.register = async (req, res) => {
  try {
    const { userid, pw, name } = req.body;
    const hashPw = bcryptPassword(pw);
    const result = await User.create({
      userid,
      name,
      pw: hashPw,
    });
    if (result) {
      res.json({ result: true });
    }
  } catch (err) {
    console.log(err);
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { userid, pw } = req.body;
    //사용자 조회
    const result = await User.findOne({
      where: { userid },
    });
    console.log('user: ', result);
    if (!result) {
      res.json({ result: false, message: '사용자가 존재하지 않습니다.' });
    }
    //비밀번호 확인
    const compare = comparePassword(pw, result.pw);
    if (compare) {
      res.json({ result: true });
    } else {
      res.json({ result: false, message: '비밀번호가 일치하지 않습니다.' });
    }
  } catch (err) {
    console.log(err);
  }
};

const bcryptPassword = (pw) => {
  return bcrypt.hashSync(pw, 10);
};

const comparePassword = (pw, dbPw) => {
  return bcrypt.compareSync(pw, dbPw);
};
