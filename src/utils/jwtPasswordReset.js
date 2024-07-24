const jwt = require("jsonwebtoken")


const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_PASSWORD_RESET_SECRET, {
    expiresIn: "8m", /* m - minute */
  });

  return token;
};


const verifyToken = (req, res, next) => {
  const token = req.params.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      errors: "Unauthorized"
    });
  }

  jwt.verify(token, process.env.JWT_PASSWORD_RESET_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        errors: "Forbidden"
      });
    }

    req.user = user;
    next();
  });
};


module.exports = {
  generateToken,
  verifyToken
}