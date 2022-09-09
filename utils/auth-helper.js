const jwt = require("jsonwebtoken");

exports.generateAuthToken = (user) => {
  const token = jwt.sign({ email: user.email, userId: user._id }, "secret", {
    expiresIn: "1h",
  });
  return token;
};
