const mysql = require('mysql');

const conn = mysql.createPool({
  host: 'localhost',
  user: 'user',
  password: '1234',
  database: 'kdt8',
  port: 3306,
  connectionLimit: 30,
});

const db_signup = (data, cb) => {
  const query = `INSERT INTO user (userid, pw, name) VALUES (?,?,?)`;
  conn.query(query, [data.userid, data.pw, data.name], (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('db_signup', rows);
    cb();
  });
};

const db_signin = (data, cb) => {
  const query = `SELECT * FROM user WHERE userid = ? AND pw = ?`;
  conn.query(query, [data.userid, data.pw], (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('db_signin', rows);
    cb(rows);
  });
};

const db_profile = (data, cb) => {
  const query = `SELECT * FROM user WHERE id = ?`;
  conn.query(query, [data.init], (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('db_profile', rows);
    cb(rows);
  });
};

const db_profile_edit = (data, cb) => {
  const query = `UPDATE user SET userid=?,name=?,pw=? WHERE id=?`;
  conn.query(query, [data.userid, data.name, data.pw, data.id], (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('db_profile_edit', rows);
    cb();
  });
};

module.exports = {
  db_signup,
  db_signin,
  db_profile,
  db_profile_edit,
};
