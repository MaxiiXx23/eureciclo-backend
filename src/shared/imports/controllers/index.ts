import { AddressController } from '@/modules/address/controllers/AddressController'
import { AuthController } from '@/modules/auth/controllers/AuthController'
import { CollaboratorController } from '@/modules/collaborator/controllers/CollaboratorController'
import { CollectController } from '@/modules/collect/controllers/CollectController'
import { CompanyController } from '@/modules/company/controllers/CompanyController'
import { ReviewController } from '@/modules/review/controllers/ReviewController'
import { UserController } from '@/modules/user/controllers/UserController'

const authController = new AuthController()
const companyController = new CompanyController()
const collaboratorController = new CollaboratorController()

const collectController = new CollectController()
const addressController = new AddressController()
const userController = new UserController()
const reviewController = new ReviewController()

export const controllers = {
  authController,
  companyController,
  collaboratorController,
  collectController,
  addressController,
  userController,
  reviewController,
}
