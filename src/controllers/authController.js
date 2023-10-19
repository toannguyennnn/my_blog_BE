const jwt = require("jsonwebtoken");
const authService = require("../service/authService");

const maxAge = 3 * 24 * 60 * 60; // three days in second
const createToken = (id, email) => {
  let payload = {
    id,
    email,
  };
  return jwt.sign(payload, "secret", { expiresIn: maxAge });
};

const signUp = async (req, res) => {
  let data = await authService.signUp(req.body);
  if (data.errCode == 0) {
    let token = createToken(data.user.id, data.user.email);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); //maxAge in ms
  }

  return res.status(200).json({
    data,
  });
};

const logIn = async (req, res) => {
  let data = await authService.logIn(req.body);
  if (data.errCode == 0) {
    let token = createToken(data.user.id, data.user.email);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  }
  return res.status(200).json({
    data,
  });
};

module.exports = {
  signUp,
  logIn,
};
