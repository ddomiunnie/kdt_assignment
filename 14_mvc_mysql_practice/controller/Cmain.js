const model = require('../model/Model');

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
  model.db_profile(req.params, (result) => {
    res.render('profile', { data: result[0] });
  });
};

//POST
exports.post_signup = (req, res) => {
  model.db_signup(req.body, () => {
    res.json({ result: true });
  });
};
exports.post_signin = (req, res) => {
  model.db_signin(req.body, (result) => {
    if (result.length > 0) {
      res.json({ result: true, data: result[0] });
    } else {
      res.json({ result: false });
    }
  });
};

//PATCH
exports.edit_profile = (req, res) => {
  model.db_profile_edit(req.body, () => {
    res.json({ result: true });
  });
};
