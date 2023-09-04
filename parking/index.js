const express = require('express');
const db = require('./models');
const app = express();
const PORT = 8000;

console.log(process.env.NODE_ENV);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require('./routes/user');
app.use('/user', router);

app.use('*', (req, res) => {
  res.render('404');
});
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
