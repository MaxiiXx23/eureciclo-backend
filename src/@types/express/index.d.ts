declare namespace Express {
  export interface Request {
    userAuth: import('../TUserAuth').default
  }
}
