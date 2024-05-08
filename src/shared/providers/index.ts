import { GenerateTokenProvider } from './GenerateTokenProvider'
import { PrismaProvider } from './PrismaProvider'

const prismaProvider = new PrismaProvider()
const generateTokenProvider = new GenerateTokenProvider()

export { prismaProvider, generateTokenProvider }
