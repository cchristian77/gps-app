import UserRepository from "./user.repository.js";
import Errors from "../../helper/errors.js";
import {HTTPStatusCode} from "../../helper/status.code.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import {generateToken} from "../../helper/token.js";

const userRepository = new UserRepository()

export default class UserService {
  async register(request) {
    const countUsername = await userRepository.countByUsername(request.nik)
    if (countUsername > 0) {
      throw new Errors.BaseError(HTTPStatusCode.BAD_REQUEST, "Username already exists.")
    }

    request.password = await bcrypt.hash(request.password, 10);
    request.uuid = uuid()
    return await userRepository.store(request)
  }

  async login(request) {
    const user = await userRepository.findByUsername(request.email)
    if (!user) {
      throw new Errors.InvalidCredentialError()
    }

    const isPasswordValid = await bcrypt.compare(request.password, user.password);
    if (!isPasswordValid) {
      throw new Errors.InvalidCredentialError()
    }

    return await userRepository.updateToken(user.id, generateToken(user.id))
  }

  async update(request) {
    const user = await userRepository.findById(request.id)
    if (!user) {
      throw new Errors.NotFoundError()
    }

    request.password = await bcrypt.hash(request.password, 10);

    await userRepository.update(request.id, request)
  }

  async findById(id) {
    const user = await userRepository.findById(id)
    if (!user) {
      throw new Errors.NotFoundError()
    }

    return user
  }

  async logout(id) {
    return await userRepository.updateToken(id, null)
  }
}
