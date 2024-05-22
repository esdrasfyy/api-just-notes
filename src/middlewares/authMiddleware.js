// authMiddleware.js
const jwt = require("jsonwebtoken");

const checkAuthentication = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "acesso negado" });
  }
  try {
    const secret = "DSHDJSIW0APCSINAIXXJSKWIDJSI";
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token invalido" });
  }
};

module.exports = checkAuthentication;
