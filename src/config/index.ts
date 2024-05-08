import { env } from '../env'

const auth = {
  secret_key_JWT: env.TOKEN_SECRET,
  experies_in_JWT: env.EXPIRES_IN_TOKEN,
  experies_in_refresh_JWT: env.EXPIRES_IN_REFRESH_TOKEN,
}

export { auth }
