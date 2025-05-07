
const jwt = require("jsonwebtoken");


function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
  
    jwt.verify(token, "Bookstore123", (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = user; // { id, name, role }
      next();
    });
  }
  

module.exports = { authenticateToken };