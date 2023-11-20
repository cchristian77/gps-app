import GpsRepository from "./gps.repository.js";
import Errors from "../../helper/errors.js";
import Pagination, {DEFAULT_PAGINATION} from "../../helper/pagination.js";

const gpsRepository = new GpsRepository()

export default class GpsService {

  /**
   * Retrieves a paginated list of GPS data based on the provided search parameters.
   *
   * @async
   * @param {object} request - The request object containing query parameters.
   * @param {number} request.query.page - The current page number for pagination. Default is 1.
   * @param {number} request.query.per_page - The number of GPS entities per page. Default is 5.
   * @param {string} request.query.search - The search term for filtering GPS entities.
   * @returns {Promise<object>} - A promise that resolves to an object containing the found GPS entities and pagination information.
   * @throws {Error} - If an error occurs during the process of finding the GPS entities.
   */
  async findAll(request) {
    const page = parseInt(request.query.page || DEFAULT_PAGINATION.PAGE)
    const perPage = parseInt(request.query.per_page || DEFAULT_PAGINATION.PER_PAGE)

    let pagination = new Pagination(page, perPage)

    const { gpses, total } = await gpsRepository.findAll(pagination, request.query.search)

    pagination.total = total

    return { gpses, pagination }
  }

  /**
   * Finds a GPS record by UUID.
   *
   * @param {string} uuid - The UUID of the GPS record to find.
   * @return {Promise<GPS>} - A promise that resolves to the GPS record if found.
   * @throws {NotFoundError} - If no GPS record is found with the specified UUID.
   */
  async findByUuid(uuid) {
    const gps = await gpsRepository.findByUuid(uuid)
    if (!gps) {
      throw new Errors.NotFoundError()
    }

    return gps
  }
}