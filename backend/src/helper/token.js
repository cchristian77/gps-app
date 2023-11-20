import jwt from "jsonwebtoken";

/**
 * Generate a JWT token for a given UUID using the provided secret and expiration time.
 *
 * @param {string} uuid - The UUID of the user to generate the token for.
 * @returns {string} - The generated JWT token.
 */
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

/**
 * Verifies the given token using JWT library and secret key.
 *
 * @param {string} token - The token to be verified.
 *
 * @returns {Object} - The payload decoded from the token.
 */
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}