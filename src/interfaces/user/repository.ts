export interface IGetInfoUser {
  id: number
  email: string
  firstName: string
  lastName: string
  description: string
  phone: string | null
  DateOfBirth: string
  address: {
    id: number
    cep: string
    street: string
    number: string
    complement: string | null
    district: string
    city: string
    state: string
    country: string
  }[]
}
