import {prisma} from "../../database/client.js"

export default class GpsRepository {
  constructor() {
    this.db = prisma
  }

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

  async findById(id) {
    return this.db.gps.findUnique({
      where: {id}
    })
  }

  async findByCode(code) {
    return this.db.gps.findUnique({
      where: {code},
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