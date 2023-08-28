const express = require('express');
const db = require('./models');
const app = express();
const PORT = 8000;
const cookieParser = require('cookie-parser');
const session = require('express-session');

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

const router = require('./routes/main');
app.use('/', router);

app.use('*', (req, res) => {
  res.status(404).render('404');
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
