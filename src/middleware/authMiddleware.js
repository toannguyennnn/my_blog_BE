require("dotenv").config();
const jwt = require("jsonwebtoken");

class AuthMiddleware {
  constructor() {
    this.nonSecurePaths = ["/blogs/all", "/sign-up", "/log-in", "/log-out"];
  }

  createToken(payload) {
    const secret = process.env.JWT_SECRET;
    const expireTime = process.env.JWT_EXPIRE_TIME;
    let token = null;
    try {
      token = jwt.sign(payload, secret, { expiresIn: expireTime });
    } catch (error) {
      return res.status(401).json({
        errCode: "-1",
        errMessage: "Not authenticated user!",
      });
    }
    return token;
  }

  verifyToken(token) {
    let secret = process.env.JWT_SECRET;
    let decodedToken = null;
    try {
      decodedToken = jwt.verify(token, secret);
    } catch (error) {
      console.log(error);
    }
    return decodedToken;
  }

  requireAuth(req, res, next) {
    if (this.nonSecurePaths.includes(req.path)) return next();

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({
        errCode: "-1",
        errMessage: "Not authenticated user!",
      });
    }

    const token = authHeader.split(" ")[1]; // Lấy phần sau "Bearer "

    if (!token) {
      return res.status(401).json({
        errCode: "-1",
        errMessage: "Not authenticated user!",
      });
    }

    let decodedToken = this.verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json({
        errCode: "-1",
        errMessage: "Not authenticated user!",
      });
    }
    req.user = decodedToken;
    next();
  }

  requirePermission(req, res, next) {
    if (this.nonSecurePaths.includes(req.path)) return next();

    if (req.user) {
      const roles = req.user.roles;
      const currentUrl = req.path;

      if (!roles || roles.length === 0) {
        return res.status(403).json({
          errCode: "-1",
          errMessage: "You dont have permission to access this resource!",
        });
      }

      let hasPermission = false;

      roles.forEach((role) => {
        const url = role.url;
        const path = url.split("/")[1];
        const regexPattern = new RegExp(`^\/${path}\/\\d+$`);
        if (regexPattern.test(currentUrl)) {
          hasPermission = true; 
        }
      });

      // if (hasPermission) {
      //   console.log("Có ít nhất một đường dẫn khớp với mẫu.");
      // } else {
      //   console.log("Không có đường dẫn nào khớp với mẫu.");
      // }

      if (!hasPermission) {
        return res.status(403).json({
          errCode: "-1",
          errMessage: "You dont have permission to access this resource!",
        });
      }

      next();
    } else {
      return res.status(401).json({
        errCode: "-1",
        errMessage: "Not authenticated user!",
      });
    }
  }
}
module.exports = AuthMiddleware;
