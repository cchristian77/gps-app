import {v4 as uuid} from "uuid";
import bcrypt from "bcrypt";

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

export const seedUserData = async (prisma) => {

  for (const user of userData) {
    await prisma.user.upsert({
      where: {username: user.username},
      update: {},
      create: user,
    })
  }

  console.log("User data are successfully seeded !")
}