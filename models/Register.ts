export type UserInfo = {
  birthday: string
  concierge_id: number
  email: string
  gender: number
  id: number
  is_update?: number | null
  name: string
  phone: string
  register_status: string
  role: Role
  role_id: number
}

export type Role = {
  id: number
  name: string
  description: string
}

export type ConciergeRegister = {
  name: string
  furigana: string
  email: string
  birthday: string
  phone: string
  post_code: string
  address: string
  nearest_station: string
  gender: number
}

export type SetNewPassword = {
  email: string
  code: string
  password: string
  password_confirmation: string
}
