import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwtAccessToken;
  if (!token) next(createError(401, "You are not allowed to access"));

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) next(createError(403, "Token is invalid."));
    req.userId = decoded.id;
    next();
  });
};

export default verifyToken;
