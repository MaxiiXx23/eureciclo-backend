import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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

statusCollect()
