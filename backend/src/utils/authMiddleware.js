const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

async function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unathorized: Missing token" });
  }
  console.log("authHeader", authHeader);
  const [bearer, token] = authHeader.split(" ");
  console.log("bearer", bearer);
  console.log("token", token);
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Unathorized: Invalid token format" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log(err.message);
      return res.status(403).json({ message: "Forbidden: Invalid Token" });
    }

    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
