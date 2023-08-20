const { error } = require('console');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 8000;
const SECRET = '9bxio6biUQlWDmNuCXpjMeCPrv5LKwXp';

const userInfo = { id: 'kdt8', pw: '1234' };

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login', (req, res) => {
  try {
    const { id, pw } = req.body;
    const { id: uId, pw: uPw } = userInfo;
    if (id === uId && pw === uPw) {
      const token = jwt.sign({ id }, SECRET);
      res.json({ result: true, token });
    } else {
      res.json({ result: false, message: '로그인 정보가 올바르지 않습니다.' });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/token', (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ');
    try {
      const result = jwt.verify(token[1], SECRET);
      console.log(result);
      if (result.id === userInfo.id) {
        res.json({ result: true, id: userInfo.id });
      }
    } catch (error) {
      console.log(error);
      res.json({ result: false, message: '인증된 회원이 아닙니다.' });
    }
  } else {
    res.redirect('/login');
  }
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
