import {v4 as uuid} from "uuid";

const day = 31
const month = 8
const year = 2022
const gpsData = [
  {
    uuid: uuid(),
    code: "D-1567",
    deviceType: {
      connect: {
        name: "Aircraft"
      }
    },
    locations: {
      create: [
        {
          timestamp: new Date(year, month, day, 10, 5),
          location: {connect: {name: "L1"}}
        },
        {
          timestamp: new Date(year, month, day, 10, 10),
          location: {connect: {name: "L1"}}
        },
        {
          timestamp: new Date(year, month, day, 10, 15),
          location: {connect: {name: "L1"}}
        },
        {
          timestamp: new Date(year, month, day, 10, 20),
          location: {connect: {name: "L1"}}
        },
        {
          timestamp: new Date(year, month, day, 10, 25),
          location: {connect: {name: "L2"}}
        },
      ],
    }
  },
  {
    uuid: uuid(),
    code: "D-1568",
    deviceType: {
      connect: {
        name: "Personal"
      }
    },
    locations: {
      create: [
        {
          timestamp: new Date(year, month, day, 10, 5),
          location: {connect: {name: "L3"}}
        },
        {
          timestamp: new Date(year, month, day, 10, 10),
          location: {connect: {name: "L3"}}
        },
        {
          timestamp: new Date(year, month, day, 10, 15),
          location: {connect: {name: "L3"}}
        },
        {
          timestamp: new Date(year, month, day, 10, 20),
          location: {connect: {name: "L3"}}
        },
        {
          timestamp: new Date(year, month, day, 10, 25),
          location: {connect: {name: "L3"}}
        },
      ],
    }
  },
  {
    uuid: uuid(),
    code: "D-1569",
    deviceType: {
      connect: {
        name: "Asset"
      }
    },
    locations: {
      create: [
        {
          timestamp: new Date(year, month, day, 10, 15),
          location: {connect: {name: "L4"}}
        },
        {
          timestamp: new Date(year, month, day, 10, 20),
          location: {connect: {name: "L4"}}
        },
        {
          timestamp: new Date(year, month, day, 10, 30),
          location: {connect: {name: "L1"}}
        },
        {
          timestamp: new Date(year, month, day, 10, 35),
          location: {connect: {name: "L1"}}
        },
      ],
    }
  },
  {
    uuid: uuid(),
    code: "D-1570",
    deviceType: {
      connect: {
        name: "Personal"
      }
    },
    locations: {
      create: [
        {
          timestamp: new Date(year, month, day, 10, 35),
          location: {connect: {name: "L5"}}
        },
      ],
    }
  },
  {
    uuid: uuid(),
    code: "D-1571",
    deviceType: {
      connect: {
        name: "Asset"
      }
    },
    locations: {
      create: [
        {
          timestamp: new Date(year, month, day, 10, 35),
          location: {connect: {name: "L6"}}
        },
      ],
    }
  },
]

export const seedGpsData = async (prisma) => {

  for (const gps of gpsData) {
    await prisma.gps.upsert({
      where: {code: gps.code},
      update: {},
      create: gps
    })
  }

  console.log("GPS data are successfully seeded !")

}