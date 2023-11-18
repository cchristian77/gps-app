import GpsRepository from "./gps.repository.js";
import Errors from "../../helper/errors.js";

const gpsRepository = new GpsRepository()

export default class GpsService {
  async findAll(request) {
    // encrypt password before storing to database
    return await gpsRepository.findAll(request.query.search)
  }

  async findByCode(code) {
    // encrypt password before storing to database
    const gps = await gpsRepository.findByCode(code)
    if (!gps) {
      throw new Errors.NotFoundError()
    }

    return gps
  }
}