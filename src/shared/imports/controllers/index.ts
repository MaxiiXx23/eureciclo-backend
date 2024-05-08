import { AuthController } from '@/modules/auth/controllers/AuthController'
import { CollaboratorController } from '@/modules/collaborator/controllers/CollaboratorController'
import { CompanyController } from '@/modules/company/controllers/CompanyController'

const authController = new AuthController()
const companyController = new CompanyController()
const collaboratorController = new CollaboratorController()

export const controllers = {
  authController,
  companyController,
  collaboratorController,
}
