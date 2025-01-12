export interface IPagination {
  offset: number
  perPage: number
  search?: string
  ordernation?: 'desc' | 'asc'
  status: boolean
}

export interface IPaginationOrderItems {
  offset: number
  perPage: number
}

export interface IRequestPaginationOrderItems {
  page: number
  perPage: number
}

export interface IRequestUpdateStatus {
  id: number
  status: boolean
}

export interface IPaginationList {
  offset: number
  perPage: number
  search?: string
}

export interface IRequestPagination {
  page: number
  perPage: number
  search?: string
  ordernation?: 'desc' | 'asc'
  type?: 'all' | 'spec' // all é o service padrão e spec é para service específico dentro do mesmo controller
  status: number
}

export interface IRequestPaginationList {
  page: number
  perPage: number
  search?: string
}
