const jwt = require("jsonwebtoken");
const { UnauthorizedException } = require("../exceptions/http.exceptions");
const User = require("../../modules/users/user.model");

exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) {
    return next(
      new UnauthorizedException("Authorization header is missing or invalid")
    );
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(
      new UnauthorizedException("Token is missing in the authorization header")
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select("-password -__v");
    if (!user) {
      return next(new UnauthorizedException("User not found"));
    }
    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedException("Token has expired"));
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedException("Invalid token"));
    } else {
      next(err);
    }
  }
};
