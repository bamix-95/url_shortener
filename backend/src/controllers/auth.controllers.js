import User from "../models/user.model.js";
import { clearAuthToken, signAuthTokenAndSendCookies } from "../utils/jwt.js";
import { loginSchema, registerSchema } from "../validators/auth-validation.js";

export const registerController = async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const { name, email, password } = validatedData;

    const userExists = await User.exists({
      email,
    });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exist with email address.",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    signAuthTokenAndSendCookies(newUser, res);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    signAuthTokenAndSendCookies(user, res);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = (req, res, next) => {
  try {
    clearAuthToken(res);
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserController = async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    next(error);
  }
};
