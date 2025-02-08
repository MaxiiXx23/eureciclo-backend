interface IGetItemListCollector {
  id: number
  firstName: string
  lastName: string
  rating: number
  profileImage: {
    id: number
    url: string
  }[]
}

export { IGetItemListCollector }
