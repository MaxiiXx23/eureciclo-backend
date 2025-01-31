interface IGetItemListCollector {
  id: number
  firstName: string
  lastName: string
  profileImage: {
    id: number
    url: string
  }[]
}

export { IGetItemListCollector }
