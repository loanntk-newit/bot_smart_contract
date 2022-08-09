export type Concierge = {
  name?: string | null
  email?: string | null
  furigana?: string | null
  gender?: number | null
  birthday?: string | null
  phone?: string | null
  post_code?: string | null
  address?: string | null
  nearest_station?: string | null
  bank_name?: string | null
  bank_number?: string | null
  brank_branch?: string | null
  childcare_experience?: string | null
  skill_note_1?: string | null
  skill_note_2?: string | null
  catch_copy: string | null
  about?: string | null
  childcare_age_id?: number | null
  postillness_children_support?: string | null
  children_disabilities_support?: string | null
  children_disabilities_support_years?: number | null
  allergy?: string | null
  can_publish_sns?: string | null
  skill_ids: number[] | null
  sick_ids: number[] | null
}

export type ProjectsByConcierge = {
  id: number
  client_id: number
  concierge_id: number
  project_id: number
  project_code: string
  description: string | null
  start_date: string | null
  end_date: string | null
  created_at: string | null
  updated_at: string | null
}
