import jwt from "jsonwebtoken";

export const generateToken = (uuid) => {
  return jwt.sign(
    {
      uuid: uuid,
      iss: process.env.APP_NAME,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    }
  )
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}