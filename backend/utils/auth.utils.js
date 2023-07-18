import jwt from "jsonwebtoken";
import crypto, { createHash } from "crypto";

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "Development",
    sameSite: "strict",
    maxAge: 30 * 24 * 24 * 60 * 60,
  });
};

const verifyToken = () =>{
    
}

export const generateOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export function genSalt() {
  return crypto.randomBytes(16).toString("base64");
}

export function genHash(password, salt) {
  return createHash("sha256")
    .update(password)
    .update(createHash("sha256").update(salt, "utf8").digest("hex"))
    .digest("hex");
}
