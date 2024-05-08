import { ITypeUserDTO } from '../typeUser'

interface ICreateCollaboratorDTO {
  id: number
  email: string
  fullName: string
  phone: string
  status: boolean
  typeUser: ITypeUserDTO
}

export { ICreateCollaboratorDTO }
