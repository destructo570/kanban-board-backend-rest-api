const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { throwError } = require("../utils/helpers");
const { validationResult } = require("express-validator");
const { generateAuthToken } = require("../utils/auth-helper");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty())
      throwError("Validation failed.", 422, errors.array());

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPw,
    });
    const result = await user.save();
    res.status(201).json({
      userId: result._id,
      firstname: result.firstName,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ email });

    if (!user) throwError("User with this email could not be found.", 401);
    loadedUser = user;

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) throwError("Wrong password.", 401);

    const token = generateAuthToken(loadedUser);

    res.status(201).json({
      token: token,
      userId: loadedUser._id,
      firstname: loadedUser.firstName,
    });
  } catch (err) {
    next(err);
  }
};
