import {PrismaClient} from '@prisma/client'
import {seedUserData} from "./seeders/user.seeder.js";
import {seedDeviceTypeData} from "./seeders/device_type.seeder.js";
import {seedLocationData} from "./seeders/location.seeder.js";
import {seedGpsData} from "./seeders/gps.seeder.js";

const prisma = new PrismaClient()

async function main() {
  await seedUserData(prisma)
  await seedDeviceTypeData(prisma)
  await seedLocationData(prisma)
  await seedGpsData(prisma)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


