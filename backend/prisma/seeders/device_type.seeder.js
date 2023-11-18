import {v4 as uuid} from "uuid";

const deviceTypeData = [
  {
    uuid: uuid(),
    name: "Aircraft",
  },
  {
    uuid: uuid(),
    name: "Personal",
  },
  {
    uuid: uuid(),
    name: "Asset",
  },
]

export const seedDeviceTypeData = async (prisma) => {

  for (const deviceType of deviceTypeData) {
    await prisma.deviceType.upsert({
      where: {name: deviceType.name},
      update: {},
      create: deviceType,
    })
  }

  console.log("Device Type data are successfully seeded !")
}