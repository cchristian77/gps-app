import {prisma} from "../../database/client.js"

export default class UserRepository {
  /**
   * @constructor
   */
  constructor() {
    this.db = prisma
  }

  /**
   * Finds a user by the given ID.
   * @param {string} id - The ID of the user to find.
   * @return {Promise<Object>} A Promise that resolves to the user object with the specified ID.
   */
  async findById(id) {
    return this.db.user.findUnique({
      where: {id}
    })
  }

  /**
   * Counts the number of users in the database with the given username.
   * @param {string} username - The username to count.
   * @returns {Promise<number>} - A promise that resolves to the count of users with the given username.
   */
  async countByUsername(username) {
    return this.db.user.count({
      where: {
        username: username
      }
    })
  }

  /**
   * Counts the number of users with the given email in the database.
   *
   * @param {string} email - The email address to search for.
   * @return {Promise<number>} - A promise resolving to the count of users with the given email.
   */
  async countByEmail(email) {
    return this.db.user.count({
      where: {
        email: email
      }
    })
  }

  /**
   * Finds a user by their username or email.
   *
   * @param {string} username - The username or email to search for.
   * @returns {Promise<Object>} - A Promise that resolves to the user object found.
   */
  async findByUsername(username) {
    return this.db.user.findFirst({
      where: {
        OR: [
          {username: username},
          {email: username},
        ]
      },
    })
  }

  /**
   * Finds a user by token in the database.
   *
   * @param {String} token - The token to search for.
   * @return {Promise<Object|Null>} - A Promise that resolves to the user object if found, or null if not found.
   */
  async findByToken(token) {
    return this.db.user.findFirst({
      where: {
        token: token
      }
    })
  }

  /**
   * Stores a user in the database.
   *
   * @param {object} user - The user object to store.
   * @param {string} user.uuid - The UUID of the user.
   * @param {string} user.username - The username of the user.
   * @param {string} user.email - The email address of the user.
   * @param {string} user.full_name - The full name of the user.
   * @param {string} user.password - The password of the user.
   * @param {string} user.role - The role of the user.
   *
   * @return {Promise} - A promise that resolves to the stored user object.
   */
  async store(user) {
    return this.db.user.create({
      data: {
        uuid: user.uuid,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        password: user.password,
        role: user.role,
      }
    })
  }

  /**
   * Updates a user in the database with the provided data.
   *
   * @param {number} id - The ID of the user to update.
   * @param {object} user - The updated user data.
   * @param {string} user.username - The new username of the user.
   * @param {string} user.email - The new email of the user.
   * @param {string} user.full_name - The new full name of the user.
   * @param {string} user.password - The new password of the user.
   * @returns {Promise<unknown>} - A promise that resolves when the update is complete.
   *    The resolved value is unknown as it depends on the implementation of the database library.
   */
  async update(id, user) {
    return this.db.user.update({
      where: {id},
      data: {
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        password: user.password,
      }
    })
  }

  /**
   * Updates the token of a user in the database.
   *
   * @param {string} id - The ID of the user.
   * @param {string} token - The new token value to update.
   * @return {Promise} - A Promise that resolves once the token is successfully updated.
   */
  async updateToken(id, token) {
    return this.db.user.update({
      where: {id},
      data: {token}
    })
  }
}
