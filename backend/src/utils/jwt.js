import jwt from "jsonwebtoken";

export const signAuthTokenAndSendCookies = (user, res) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d", audience: ["user"] },
  );

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user" });
  }

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
};

export const clearAuthToken = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
  });
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const decodeToken = (token) => {
  try {
    if (!token) throw new Error("Token is missing");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};
