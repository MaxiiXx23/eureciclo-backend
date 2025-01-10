import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

import multer from 'multer'

import { generatePath } from '@/utils/upload/generatePath'
import { MulterError } from '@/utils/exceptions/MulterError'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const tmpFolder = resolve(__dirname, '..', 'tmp/uploads')

export function uploadConfig(allowedTypes: string[]) {
  const config: multer.Options = {
    dest: tmpFolder,
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const filename = generatePath({
          file,
        })

        return callback(null, filename)
      },
    }),
    fileFilter: (req, file, callback) => {
      const splitedOriginalName = file.originalname
        .toLocaleLowerCase()
        .split('.')

      const extension = splitedOriginalName[splitedOriginalName.length - 1]

      let isAcceptExtension = false

      // eslint-disable-next-line array-callback-return
      allowedTypes.filter((extname) => {
        if (extension.includes(extname)) {
          isAcceptExtension = true
        }
      })

      if (isAcceptExtension) {
        return callback(null, true)
      } else {
        return callback(new MulterError('Extensão não permitida.'))
      }
    },
    limits: {
      fileSize: 500 * 1024 * 1024,
    },
  }
  return config
}
