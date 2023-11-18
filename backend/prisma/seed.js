import { PrismaClient } from '@prisma/client'
import {v4 as uuid} from "uuid";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

const userData = [
  {
    uuid: uuid(),
    username: "administrator",
    email: "administrator@example.com",
    full_name: "Administrator",
    password: await bcrypt.hash("administrator", 10),
    role: "ADMINISTRATOR",
  },
  {
    uuid: uuid(),
    username: "justin_bieber",
    email: "justin_bieber@example.com",
    full_name: "Justin Bieber",
    password: await bcrypt.hash("justin_bieber", 10),
    role: "USER",
  },
]

async function main() {
  for (const user of userData) {

    const result = await prisma.user.upsert({
      where: {username: user.username},
      update: {},
      create: {
        uuid: user.uuid,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        password: user.password,
        role: user.role,
      },
    })
  }

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


