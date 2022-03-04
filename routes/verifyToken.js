const jwt = require("jsonwebtoken");

const VerifyToken = (req, res, next) => {
  const authHeaders = req.headers.token;

  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    jwt.verify(token, process.env.JWT_TOKEN, function (err, user) {
      if (err) {
        return res.status(401).json("Token is not valid");
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You don't have permission");
    }
  });
};

module.exports = { VerifyToken, verifyTokenAndAuthorization };
