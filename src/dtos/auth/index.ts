interface IPayloadTokenJWT {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  typeUserId: number
  urlImageProfile: string
  businesses: {
    id: number
    createdAt: Date
  } | null
}

export { IPayloadTokenJWT }
