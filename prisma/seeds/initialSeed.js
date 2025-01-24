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
      {
        type: 'business',
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
      typeUserId: 3,
    }

    await prisma.typeUser.create({
      data: typeUsers[1],
    })

    await prisma.typeUser.create({
      data: typeUsers[2],
    })

    await prisma.typeUser.create({
      data: typeUsers[0],
    })

    await prisma.typeUser.create({
      data: typeUsers[3],
    })

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

async function statusSubscriptionSeed() {
  try {
    const status = [
      {
        name: 'Ativo',
        color: '#10B981',
      },
      {
        name: 'Expirado',
        color: '#FACC15',
      },
      {
        name: 'Cancelado',
        color: '#DC2626',
      },
    ]

    await prisma.statusSubscription.create({
      data: status[0],
    })

    await prisma.statusSubscription.create({
      data: status[1],
    })

    await prisma.statusSubscription.create({
      data: status[2],
    })

    console.log('Seed done with successfully!')
  } catch (error) {
    console.log(`Error on seed: ${error}`)
  }
}

async function planSeed() {
  try {
    await prisma.plans.create({
      data: {
        name: 'Plano Empresa',
        description:
          'Plano Empresa te oferece todas as funcionalidades para o seu negócio.',
        price: 59.9,
        durationDays: 30,
      },
    })

    console.log('Seed done with successfully!')
  } catch (error) {
    console.log(`Error on seed: ${error}`)
  }
}

async function statusCollect() {
  try {
    const status = [
      {
        name: 'Coletado',
        color: '#10B981',
      },
      {
        name: 'Entregue',
        color: '#84cc16',
      },
      {
        name: 'Em Processo de Coleta',
        color: '#0284c7',
      },
      {
        name: 'Aguardando Coleta',
        color: '#FACC15',
      },
      {
        name: 'Cancelado',
        color: '#DC2626',
      },
    ]

    await prisma.statusCollect.create({
      data: status[0],
    })

    await prisma.statusCollect.create({
      data: status[1],
    })

    await prisma.statusCollect.create({
      data: status[2],
    })

    await prisma.statusCollect.create({
      data: status[3],
    })

    await prisma.statusCollect.create({
      data: status[4],
    })

    console.log('Seed done with successfully!')
  } catch (error) {
    console.log(`Error on seed: ${error}`)
  }
}

initialSeed()
statusSubscriptionSeed()
statusCollect()
planSeed()
