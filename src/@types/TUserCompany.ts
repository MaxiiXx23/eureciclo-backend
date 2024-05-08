interface TUserCompany {
  id: number
  userId: number
  companyId: number
  status: boolean
  admin: boolean
  createdAt: Date
  updatedAt: Date
}

interface TCreateUserCompany {
  userId: number
  companyId: number
  admin: boolean
}

export { TUserCompany, TCreateUserCompany }
