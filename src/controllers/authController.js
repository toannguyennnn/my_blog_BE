const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/authMiddleware");

const AuthMiddleware = require("../middleware/authMiddleware");
const AuthService = require("../service/authService");

class AuthController {
  async signUp(req, res) {
    const signUpService = new AuthService(
      req.body.id,
      req.body.fullname,
      req.body.email,
      req.body.password,
      req.body.phonenumber,
      req.body.userGroup_id
    );

    let data = await signUpService.createUser();

    if (data.errCode == 0) {
      const payload = {
        id: data.user.id,
        email: data.user.email,
        roles: data.roles,
      };

      const authMiddleware = new AuthMiddleware();
      var token = authMiddleware.createToken(payload);
    }

    return res.status(200).json({
      data,
      token,
    });
  }
  async logIn(req, res) {
    const logInService = new AuthService(
      req.body.id,
      req.body.fullname,
      req.body.email,
      req.body.password,
      req.body.phonenumber,
      req.body.userGroup_id
    );

    let data = await logInService.logIn();

    if (data.errCode == 0) {
      const payload = {
        id: data.user.id,
        email: data.user.email,
        roles: data.roles,
      };
      const authMiddleware = new AuthMiddleware();
      var token = authMiddleware.createToken(payload);
    }

    return res.status(200).json({
      data,
      token,
    });
  }
}
module.exports = AuthController;
