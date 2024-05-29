import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from "bcrypt"

async function main() {
  const alice = await prisma.user.upsert({
    where: { email : "d@g.com" },
    update: {},
    create: {
      email: 'd@g.com',
      password: await bcrypt.hash("123" , 10),
      OnRampTransaction: {
        create: {
          StartTime: new Date(),
          Status: "SUCCESS",
          amount: 20100,
          token: "1222",
          Provider: "HDFC Bank",
        },
      },
      Balance: {
        create : {
           amount : 20100,
           locked : 0, 
        }
      }
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'n@g.com' },
    update: {},
    create: {
      email: 'n@g.com',
      password: await bcrypt.hash("123" , 10),
      OnRampTransaction: {
        create: {
          StartTime: new Date(),
          Status: "FAILED",
          amount: 2000,
          token: "1223",
          Provider: "HDFC Bank",
        },
      },
      Balance : {
        create : {
            amount : 0,
            locked : 0,
        }
      }
    },
  })
  console.log({ alice, bob })
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