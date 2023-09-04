const { User } = require('../models');
const bcrypt = require('bcrypt');

//GET
exports.signup = (req, res) => {
  res.render('signup');
};
exports.login = (req, res) => {
  res.render('login');
};
exports.success = (req, res) => {
  res.render('success');
};

//POST
exports.post_signup = async (req, res) => {
  const { userid, password, name, nickname, phone } = req.body;
  try {
    const user = await User.create({
      userid,
      password,
      name,
      nickname,
      phone,
    });
    res.json({ result: true, data: user }); // 회원가입 성공 시 사용자 정보를 반환
  } catch (error) {
    res
      .status(500)
      .json({ result: false, message: '회원가입에 실패했습니다.' });
  }
};

exports.post_login = async (req, res) => {
  const { userid, password } = req.body;
  try {
    const user = await User.findOne({
      where: { userid: userid },
    });
    if (user) {
      const result = await bcrypt.compare(password, user.password);

      res.json({ result: true, data: user });
    } else {
      res.json({ result: false, message: '존재하는 사용자가 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ result: false, message: '로그인에 실패했습니다.' });
  }
};
