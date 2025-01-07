interface IPayloadTokenJWT {
  id: number
  firstName: string
  lastName: string
  email: string
  typeUserId: number
  businesses: {
    id: number
    createdAt: Date
  } | null
}

export { IPayloadTokenJWT }
