export type Shift = {
  id?: number
  concierge_id?: number | null
  start_time?: string | null
  end_time?: string | null
  date_time?: string | null
  created_at?: string | null
  updated_at?: string | null
}

export type Shifts = {
  concierge_id?: number | null
  shifts?: Shift[] | null
}

export type EventDate = {
  date?: string | null
  display?: string | null
}
