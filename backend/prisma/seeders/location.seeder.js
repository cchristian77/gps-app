import {v4 as uuid} from "uuid";

const locationData = [
  {
    uuid: uuid(),
    name: "L1",
    latitude: 1.5,
    longitude: 3.5,
  },
  {
    uuid: uuid(),
    name: "L2",
    latitude: 1.5,
    longitude: 3.5,
  },
  {
    uuid: uuid(),
    name: "L3",
    latitude: 1.5,
    longitude: 3.5,
  },
  {
    uuid: uuid(),
    name: "L4",
    latitude: 1.5,
    longitude: 3.5,
  },
  {
    uuid: uuid(),
    name: "L5",
    latitude: 1.5,
    longitude: 3.5,
  },
  {
    uuid: uuid(),
    name: "L6",
    latitude: 1.5,
    longitude: 3.5,
  },
]

export const seedLocationData = async (prisma) => {

  for (const location of locationData) {
    await prisma.location.upsert({
      where: {name: location.name},
      update: {},
      create: location,
    })
  }

  console.log("Location data are successfully seeded !")
}