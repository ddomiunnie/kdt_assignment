const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./models');
const app = express();
const PORT = 8000;

console.log(process.env.NODE_ENV);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'mySession',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 1000,
    },
  })
);

const router = require('./routes/user');
app.use('/', router);

app.use('*', (req, res) => {
  res.render('404');
});
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
