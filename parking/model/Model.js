const mysql = require('mysql');

const conn = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'kdt8',
  port: 3306,
  connectionLimit: 30,
});

//회원가입
exports.db_signup = (data, cb) => {
  const query = `INSERT INTO user (userid, password, name, nickname, phone) VALUES (?,?,?,?,?)`;
  conn.query(
    query,
    [data.userid, data.password, data.name, data.nickname, data.phone],
    (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('db_signup', rows);
      cb();
    }
  );
};

//로그인
exports.db_login = (data, cb) => {
  const query = `SELECT * FROM user WHERE userid = ? password = ?`;
  conn.query(query, [data.userid, data.password], (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('db_login', rows);
    cb(rows);
  });
};
