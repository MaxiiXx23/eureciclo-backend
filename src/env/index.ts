import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number(),
  TOKEN_SECRET: z.string(),
  EXPIRES_IN_TOKEN: z.string(),
  EXPIRES_IN_REFRESH_TOKEN: z.string(),
  //   AWS_SES_REGION: z.string(),
  //   AWS_SES_ACCESS_KEY_ID: z.string(),
  //   AWS_SES_SECRET_ACCESS_KEY: z.string(),
  //   AWS_REGION: z.string(),
  //   AWS_S3_BUCKET_NAME: z.string(),
  //   AWS_S3_BUCKET_URL: z.string(),
  //   EMAIL_NO_REPLAY: z.string(),
  //   EMAIL_SEND: z.string(),
  //   EXPIRES_IN_TOKEN_RESET_PASSWORD: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(
    'Erro ao verificar variáveis de ambiente. Por favor, verifique se faltou ou inseriou alguma variável errada.',
    _env.error.format(),
  )
  throw new Error('Erro ao verificar variáveis de ambiente.')
}

export const env = _env.data
