const jwt = require("jsonwebtoken");
const authService = require("../service/authService");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (userId) => {
  return jwt.sign({ userId }, "secret", { expiresIn: maxAge });
};

const signUp = async (req, res) => {
  let data = await authService.createUser(req.body);
  if (data.errCode == 0) {
    let token = createToken(data.user.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  }

  return res.status(200).json({
    data,
  });
};

module.exports = {
  signUp,
};
