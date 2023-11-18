import GpsRepository from "./gps.repository.js";
import Errors from "../../helper/errors.js";
import Pagination from "../../helper/pagination.js";

const gpsRepository = new GpsRepository()

export default class GpsService {
  async findAll(request) {
    let pagination = new Pagination(parseInt(request.query.page), parseInt(request.query.per_page))

    const { gpses, total } = await gpsRepository.findAll(pagination, request.query.search)

    pagination.total = total

    return { gpses, pagination }
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