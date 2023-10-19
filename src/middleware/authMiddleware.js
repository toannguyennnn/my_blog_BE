const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "secret", (err, decodedToken) => {
      if (decodedToken) {
        console.log(decodedToken)
        next();
      } else {
        console.log(err)
        return res.status(401).json({
          errCode: "-1",
          errMessage: "Not authenticated user!",
        });
      }
    });
  } else {
    return res.status(401).json({
      errCode: "-1",
      errMessage: "Not authenticated user!",
    });
  }
};

module.exports = { requireAuth };
