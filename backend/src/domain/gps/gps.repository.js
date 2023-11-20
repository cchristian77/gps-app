import {prisma} from "../../database/client.js"

export default class GpsRepository {
  /**
   * Creates a new instance of the constructor.
   * @constructor
   */
  constructor() {
    this.db = prisma
  }

  /**
   * Retrieves a list of GPS records based on the provided pagination and search criteria.
   *
   * @param {Pagination} pagination - The pagination object used to determine the offset and limit of the query.
   * @param {string} search - The search string used to filter the GPS records.
   * @return {Promise<{ gpses: Array<GPS>, total: number }>} Promise that resolves to an object containing the list of GPS records and the total count.
   */
  async findAll(pagination, search) {
    const query = {
      where: {
        OR: [
          {
            code: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            deviceType: {
              name: {
                contains: search,
                mode: "insensitive"
              }
            }
          }
        ]
      }
    }

    const relation = {
      deviceType: true,
      locations: {
        take: 1,
        orderBy: {
          timestamp: "desc"
        },
        include: {
          location: true,
        }
      },
    }

    const [ gpses, total ] = await this.db.$transaction( [
      this.db.gps.findMany({
        where: query.where,
        include: relation,
        skip: pagination.getOffset(),
        take: pagination.getLimit(),
      }),
      this.db.gps.count({ where: query.where })
    ])

    return { gpses, total }
  }

  /**
   * Finds a record by ID in the GPS database.
   *
   * @param {string|number} id - The ID of the record to find.
   * @return {Promise<Object|null>} - A promise that resolves to the found record object, or null if not found.
   */
  async findById(id) {
    return this.db.gps.findUnique({
      where: {id}
    })
  }

  /**
   * Finds a GPS entry by its code.
   *
   * @param {string} code - The code of the GPS entry to find.
   * @return {Promise} - A promise that resolves to the GPS entry found, or null if not found.
   */
  async findByCode(code) {
    return this.db.gps.findUnique({
      where: {code}
    })
  }

  /**
   * Finds a GPS record by the given UUID.
   *
   * @param {string} uuid - The UUID to search for.
   * @returns {Promise<object>} - A promise that resolves to the GPS record with the given UUID,
   * or `null` if no record is found.
   *
   * @example
   * const gpsRecord = await findByUuid('12345');
   * console.log(gpsRecord);
   * // Output: { id: 1, uuid: '12345', deviceType: 'phone', locations: [...] }
   */
  async findByUuid(uuid) {
    return this.db.gps.findFirst({
      where: {uuid},
      include: {
        deviceType: true,
        locations: {
          orderBy: [
            {location_id: "asc"},
            {timestamp: "asc",}
          ],
          include: {
            location: true,
          }
        },
      }
    })
  }

}