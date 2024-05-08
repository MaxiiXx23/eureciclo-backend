import { ensureToken } from '@/shared/middlewares/ensure/ensureToken'
import { ensureUserClientAdmin } from '@/shared/middlewares/ensure/ensureUserClientAdmin'

export const middlewares = {
  ensureToken,
  ensureUserClientAdmin,
}
