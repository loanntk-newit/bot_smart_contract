export type UserInfo = {
  id?: number
  firstname?: string | null
  lastname?: string | null
  email?: string | null
  expiredAt?: number | Date
}

export type Wallet = {
  id?: number
  privateKey?: string | null
  userId?: number | null
  commandId?: number | null
}

export type Command = {
  id?: number
  state?: number | null
  userId?: number | null
  presaleContract?: string | null
  bnbAmount?: number | null
  gasPrice?: number | null
  gasLimit?: number | null
  timeStarts?: number[] | null
  walletIds?: number[] | null
  createAt?: number | Date
  updateAt?: number | Date
}
