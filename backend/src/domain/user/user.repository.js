import {prisma} from "../../database/client.js"

export default class UserRepository {
  constructor() {
    this.db = prisma
  }

  async findById(id) {
    return this.db.user.findUnique({
      where: {id}
    })
  }

  async countByUsername(username) {
    return this.db.user.count({
      where: {
        username: username
      }
    })
  }

  async findByUsername(username) {
    return this.db.user.findFirst({
      where: {
        username: username
      },
    })
  }

  async findByToken(token) {
    return this.db.user.findFirst({
      where: {
        token: token
      }
    })
  }

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

  async updateToken(id, token) {
    return this.db.user.update({
      where: {id},
      data: {token}
    })
  }
}
