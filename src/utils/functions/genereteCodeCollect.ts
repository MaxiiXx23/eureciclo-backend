import { customAlphabet } from 'nanoid'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
// Define o tamanho do código
const size = 6

// Gera um código aleatório
const genereteCodeCollect = customAlphabet(alphabet, size)

export { genereteCodeCollect }
