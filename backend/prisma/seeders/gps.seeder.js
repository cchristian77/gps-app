import {v4 as uuid} from "uuid";

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
          timestamp: `2023-08-31T10:05:00.000Z`,
          location: {connect: {name: "L1"}}
        },
        {
          timestamp: `2023-08-31T10:10:00.000Z`,
          location: {connect: {name: "L1"}}
        },
        {
          timestamp: `2023-08-31T10:15:00.000Z`,
          location: {connect: {name: "L1"}}
        },
        {
          timestamp: `2023-08-31T10:20:00.000Z`,
          location: {connect: {name: "L1"}}
        },
        {
          timestamp: `2023-08-31T10:25:00.000Z`,
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
          timestamp: `2023-08-31T10:05:00.000Z`,
          location: {connect: {name: "L3"}}
        },
        {
          timestamp: `2023-08-31T10:10:00.000Z`,
          location: {connect: {name: "L3"}}
        },
        {
          timestamp: `2023-08-31T10:15:00.000Z`,
          location: {connect: {name: "L3"}}
        },
        {
          timestamp: `2023-08-31T10:20:00.000Z`,
          location: {connect: {name: "L3"}}
        },
        {
          timestamp: `2023-08-31T10:25:00.000Z`,
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
          timestamp: `2023-08-31T10:15:00.000Z`,
          location: {connect: {name: "L4"}}
        },
        {
          timestamp: `2023-08-31T10:20:00.000Z`,
          location: {connect: {name: "L4"}}
        },
        {
          timestamp: `2023-08-31T10:30:00.000Z`,
          location: {connect: {name: "L1"}}
        },
        {
          timestamp: `2023-08-31T10:35:00.000Z`,
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
          timestamp: `2023-08-31T10:35:00.000Z`,
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
          timestamp: `2023-08-31T10:35:00.000Z`,
          location: {connect: {name: "L6"}}
        },
      ],
    }
  },
  {
    uuid: uuid(),
    code: "D-1572",
    deviceType: {
      connect: {
        name: "Asset"
      }
    },
    locations: {
      create: [
        {
          timestamp: `2023-08-31T10:35:00.000Z`,
          location: {connect: {name: "L6"}}
        },
        {
          timestamp: `2023-08-31T10:40:00.000Z`,
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