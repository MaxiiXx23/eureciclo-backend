interface IPayloadTokenJWT {
  id: number
  firstName: string
  lastName: string
  email: string
  typeUserId: number
  companyId: number | null
}

export { IPayloadTokenJWT }
