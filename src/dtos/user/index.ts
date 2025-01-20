export interface IGetInfoUserDTO {
  id: number
  email: string
  name: string
  description: string
  phone: string | null
  dateOfBirth: string
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
  } | null
}
