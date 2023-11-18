import {prisma} from "../../database/client.js"

export default class GpsRepository {
  constructor() {
    this.db = prisma
  }

  async findAll(search) {
    return this.db.gps.findMany({
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
      },
      include: {
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
    })
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