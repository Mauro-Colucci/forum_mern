import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const { username, password, confirmPassword, email } = req.body;
    if (password !== confirmPassword)
      return next(createError(400, "passwords do not match."));
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, password: hashedPassword, email });

    res.status(201).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found."));

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return next(createError(400, "Wrong credentials."));

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.ACCESS_TOKEN
    );

    const { password, ...info } = user._doc;

    res
      .cookie("jwtAccessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .send(info);
    //to use with jwt-decode in react
    //.send(token);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  const { cookies } = req;
  if (!cookies?.jwtAccessToken) return next(createError(204, "No content."));
  res
    .clearCookie("jwtAccessToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has logged out. Cookie cleared.");
};
