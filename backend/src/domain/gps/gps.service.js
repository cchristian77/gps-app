import GpsRepository from "./gps.repository.js";
import Errors from "../../helper/errors.js";
import Pagination, {DEFAULT_PAGINATION} from "../../helper/pagination.js";

const gpsRepository = new GpsRepository()

export default class GpsService {
  async findAll(request) {
    const page = parseInt(request.query.page || DEFAULT_PAGINATION.PAGE)
    const perPage = parseInt(request.query.per_page || DEFAULT_PAGINATION.PER_PAGE)

    let pagination = new Pagination(page, perPage)

    const { gpses, total } = await gpsRepository.findAll(pagination, request.query.search)

    pagination.total = total

    return { gpses, pagination }
  }

  async findByUuid(uuid) {
    const gps = await gpsRepository.findByUuid(uuid)
    if (!gps) {
      throw new Errors.NotFoundError()
    }

    return gps
  }
}