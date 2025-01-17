import { AddressController } from '@/modules/address/controllers/AddressController'
import { AuthController } from '@/modules/auth/controllers/AuthController'
import { CollaboratorController } from '@/modules/collaborator/controllers/CollaboratorController'
import { CollectController } from '@/modules/collect/controllers/CollectController'
import { CompanyController } from '@/modules/company/controllers/CompanyController'

const authController = new AuthController()
const companyController = new CompanyController()
const collaboratorController = new CollaboratorController()

const collectController = new CollectController()
const addressController = new AddressController()

export const controllers = {
  authController,
  companyController,
  collaboratorController,
  collectController,
  addressController,
}
