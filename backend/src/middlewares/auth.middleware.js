import User from "../models/user.model.js";
import { decodeToken } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized, no token provided" });
    }
    const decoded = decodeToken(token);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
