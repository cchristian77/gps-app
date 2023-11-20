import UserRepository from "./user.repository.js";
import Errors from "../../helper/errors.js";
import {HTTPStatusCode} from "../../helper/status.code.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import {generateToken} from "../../helper/token.js";

const userRepository = new UserRepository()

export default class UserService {
  /**
   * Registers a user in the system.
   *
   * @async
   * @param {Object} request - The user registration request.
   * @param {string} request.username - The username of the user.
   * @param {string} request.email - The email of the user.
   * @param {string} request.password - The password of the user.
   * @return {Promise} - A promise that resolves to the stored user object.
   * @throws {Errors.BaseError} - If the username or email already exists in the database.
   */
  async register(request) {
    // check if the requested username already exists in the database
    const countUsername = await userRepository.countByUsername(request.username)
    if (countUsername > 0) {
      throw new Errors.BaseError(HTTPStatusCode.BAD_REQUEST, "Username already exists.")
    }

    // check if the requested email already exists in the database
    const countEmail = await userRepository.countByEmail(request.email)
    if (countEmail > 0) {
      throw new Errors.BaseError(HTTPStatusCode.BAD_REQUEST, "Email already exists.")
    }

    // encrypt password before storing to database
    request.password = await bcrypt.hash(request.password, 10)

    // trim white space and lowercase username
    request.username = request.username.trim().toLowerCase()
    request.email =  request.email.trim().toLowerCase()

    request.uuid = uuid()

    return await userRepository.store(request)
  }

  /**
   * Logs in a user with the given request.
   *
   * @param {Object} request - The login request.
   * @param {string} request.username - The username of the user to log in.
   * @param {string} request.password - The password of the user to log in.
   * @throws {Errors.InvalidCredentialError} - Thrown if the username or password is invalid.
   * @returns {Promise<void>} - A Promise that resolves once the login has been successfully processed.
   */
  async login(request) {
    request.username = request.username.trim().toLowerCase()

    const user = await userRepository.findByUsername(request.username)
    if (!user) {
      throw new Errors.InvalidCredentialError()
    }

    // compare the requested password with the encrypted password in the database
    const isPasswordValid = await bcrypt.compare(request.password, user.password);
    if (!isPasswordValid) {
      throw new Errors.InvalidCredentialError()
    }

    // store generated token to the database
    return await userRepository.updateToken(user.id, generateToken(user.id))
  }

  /**
   * Updates the user information in the database.
   *
   * @param {Object} request - The request object containing the user information to update.
   * @param {string} request.id - The ID of the user to update.
   * @param {string} request.password - The new password for the user.
   * @param {string} request.username - The new username for the user.
   * @param {string} request.email - The new email for the user.
   *
   * @throws {Errors.NotFoundError} - If the user with the given ID is not found in the database.
   *
   * @returns {Promise<void>} - Resolves when the user information is updated successfully.
   */
  async update(request) {
    const user = await userRepository.findById(request.id)
    if (!user) {
      throw new Errors.NotFoundError()
    }

    request.password = await bcrypt.hash(request.password, 10);

    // trim white space and lowercase username
    request.username = request.username.trim().toLowerCase()
    request.email =  request.email.trim().toLowerCase()

    await userRepository.update(request.id, request)
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<object>} A promise that resolves to the user object found.
   * @throws {NotFoundError} If no user is found with the given ID.
   */
  async findById(id) {
    const user = await userRepository.findById(id)
    if (!user) {
      throw new Errors.NotFoundError()
    }

    return user
  }

  /**
   * Logout user by updating the token in the database to null.
   *
   * @param {string} id - The ID of the user to logout.
   * @returns {Promise<void>} - A promise that resolves when the token is updated.
   */
  async logout(id) {
    // empty token in the database
    return await userRepository.updateToken(id, null)
  }
}
