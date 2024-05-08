import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function initialSeed() {
  try {
    const salt = await bcrypt.genSalt(6)
    const hash = await bcrypt.hash('Teste!@#123', salt)

    const typeUsers = [
      {
        type: 'admin',
      },
      {
        type: 'user',
      },
      {
        type: 'collector',
      },
    ]

    const occupationAreaCompany = [
      {
        name: 'Restaurante',
      },
      {
        name: 'Comércio',
      },
      {
        name: 'Coletora',
      },
    ]

    const userAdmin = {
      email: 'max.232017@gmail.com',
      password: hash,
      fullName: 'Max Jônatas Da Silva Lima',
      firstName: 'Max',
      lastName: 'Lima',
      description: '',
      phone: '11981445890',
      docIdentification: '999.999.999-99',
      DateOfBirth: '31/01/2000',
      typeUserId: 1,
    }

    Promise.all(
      typeUsers.map(async (item) => {
        await prisma.typeUser.create({
          data: item,
        })
      }),
    )

    Promise.all(
      occupationAreaCompany.map(async (item) => {
        await prisma.occupationArea.create({
          data: item,
        })
      }),
    )

    await prisma.user.create({
      data: userAdmin,
    })

    console.log('Seed done with successfully!')
  } catch (error) {
    console.log(`Error on seed: ${error}`)
  }
}

initialSeed()
