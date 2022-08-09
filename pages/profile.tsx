import type { NextPageWithAuth } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useReducer, useState } from 'react'
import { ButtonPrimary } from '../components/Button'
import {
  BasicCheckbox,
  BasicCheckboxGroup,
  InputHasNote,
  BasicArea,
  BasicInput,
  BasicSelect,
  ChildcareAgesSelect,
  InputDate,
} from '../components/Form'
import { Genders, IsCan, YN } from '../stores/Register'
import Loading from '../components/Loading/Loading'
import useAxios from '../hooks/useAxios'
import LayoutAuth from '../layouts/LayoutAuth'
import * as yup from 'yup'
import useTitle from '../hooks/useTitle'
import Link from 'next/link'

const formatDateToString = (date: Date) => {
  if (!date) date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const initInputState = {
  input: {
    name: '',
    furigana: '',
    email: '',
    birthday: formatDateToString(new Date()),
    phone: '',
    post_code: '',
    address: '',
    nearest_station: '',
    gender: 0,
    bank_name: '',
    bank_number: '',
    brank_branch: '',
    childcare_experience: '',
    skill_note_1: '',
    skill_note_2: '',
    catch_copy: '',
    about: '',
    children_disabilities_support: '',
    allergy: '',
    can_publish_sns: '',
    childcare_age_id: null,
    postillness_children_support: '',
    children_disabilities_support_years: 0,
    skill_ids: [],
    sick_ids: [],
  },
  errors: [],
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'update-info':
      state.input = { ...state.input, ...action.values }
      return { ...state }
    case 'change':
      state.input[action.key] = action.value
      return { ...state }
    case 'validation':
      return { ...state, errors: action.errors }
    case 'clear-validation':
      return { ...state, errors: [] }
  }
}

const Profile: NextPageWithAuth = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [state, dispatch] = useReducer(reducer, initInputState)
  const [isSubmit, setIsSubmit] = useState<number>(0)
  const [conciergeId, setConciergeId] = useState<number | null>(null)
  useTitle('Profile')

  const { operation: fetchData, data } = useAxios('/me', 'GET', null)
  const { operation: getSicks, data: listSick } = useAxios('/sicks', 'GET', null)
  const { operation: fetchConcierge, data: oldData } = useAxios(
    `/concierges/${conciergeId}`,
    'GET',
    null
  )
  const { operation: getSkillType1, data: listSkillType1 } = useAxios(
    '/skills?skill_type=1',
    'GET',
    null
  )
  const { operation: getSkillType2, data: listSkillType2 } = useAxios(
    '/skills?skill_type=2',
    'GET',
    null
  )
  const { operation: getChildcareAges, data: listChildcareAges } = useAxios(
    '/childcare_ages',
    'GET',
    null
  )

  const {
    operation: concierges,
    data: dataSend,
    error,
  } = useAxios(`/concierges/${conciergeId}`, 'PUT', state.input)

  useEffect(() => {
    const init = async () => {
      await fetchData()
      await getSkillType1()
      await getSkillType2()
      await getChildcareAges()
      await getSicks()
      setLoading(false)
    }
    init()
  }, [])

  useEffect(() => {
    data && setConciergeId(data.data.concierge_id)
  }, [data])

  useEffect(() => {
    conciergeId && fetchConcierge()
  }, [conciergeId])

  useEffect(() => {
    if (oldData) {
      if (oldData?.data) {
        oldData.data.about = convertHTML(oldData?.data.about).replace(/<[^>]+>/g, '')
        oldData.data.childcare_experience = convertHTML(oldData?.data.childcare_experience).replace(
          /<[^>]+>/g,
          ''
        )
      }
      dispatch({ type: 'update-info', values: oldData?.data })
    }
  }, [oldData])

  useEffect(() => {
    if (dataSend?.result_code == 'SUCCESS') {
      router.push('/mypage')
    }
  }, [dataSend])

  const handleSubmit = () => {
    state.input.childcare_age_id =
      (document.getElementsByName('childcare_age_id')[0] as HTMLSelectElement)?.value ?? NaN
    state.input.postillness_children_support = (
      document.getElementsByName('postillness_children_support')[0] as HTMLSelectElement
    ).value
    state.input.children_disabilities_support = (
      document.getElementsByName('children_disabilities_support')[0] as HTMLSelectElement
    ).value
    state.input.can_publish_sns = (
      document.getElementsByName('can_publish_sns')[0] as HTMLSelectElement
    ).value

    let schema = yup.object().shape({
      name: yup.string().required('名前必須項目です').label('名前'),
      furigana: yup.string().required('フリガナ必須項目です').label('フリガナ'),
      birthday: yup.string().required('生年月日必須項目です').label('生年月日'),
      email: yup.string().required('メールアドレス必須項目です').label('メールアドレス'),
      gender: yup.string().required('性別必須項目です').label('性別'),
      phone: yup.string().required('携帯電話番号必須項目です').label('携帯電話番号'),
      post_code: yup.string().required('郵便番号必須項目です').label('郵便番号'),
      address: yup.string().required('住所必須項目です').label('住所'),
      nearest_station: yup.string().required('最寄駅必須項目です').label('最寄駅'),
      bank_name: yup.string().nullable().required('銀行必須項目です').label('銀行'),
      bank_number: yup
        .string()
        .nullable()
        .required('報酬振込先口座必須項目です')
        .label('報酬振込先口座'),
      brank_branch: yup.string().nullable().required('支店必須項目です').label('支店'),
      about: yup
        .string()
        .nullable()
        .required('自己紹介文必須項目です')
        .min(500, '自己紹介文が500〜1000範囲内の必要があります')
        .max(1000, '自己紹介文が500〜1000範囲内の必要があります')
        .label('自己紹介文'),
      childcare_age_id: yup
        .number()
        .nullable(true)
        .label('保育可能年齢')
        .transform((_, val) => (val === Number(val) ? val : null)),
      children_disabilities_support: yup
        .string()
        .required('障がい児対応必須項目です')
        .label('障がい児対応'),
      postillness_children_support: yup
        .string()
        .required('病後児対応対応必須項目です')
        .label('病後児対応'),
      can_publish_sns: yup
        .string()
        .required('あなたのことを SNS やホームページ必須項目です')
        .label('あなたのことを SNS やホームページ'),
    })

    schema
      .validate(state.input, { abortEarly: false })
      .then(async () => {
        dispatch({ type: 'clear-validation' })
        setLoading(true)
        await concierges()
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        dispatch({ type: 'validation', errors: err.inner })
        setLoading(false)
      })
  }

  const convertHTML = (encodedString: string) => {
    let textArea = document.createElement('textarea')
    textArea.innerHTML = encodedString
    return textArea.value
  }

  return (
    <div className="mx-auto max-w-[940px] pb-10 sm:py-[80px]">
      {loading && <Loading />}
      <div className="pb-5">
        <Link href="/mypage">
          <span className="font-bold text-primary-origin cursor-pointer underline hover:underline-offset-1">
            マイページに戻る
          </span>
        </Link>
      </div>
      <>
        <BasicInput
          label="名 前"
          placeholder="山田 花子"
          name="name"
          value={state.input.name ?? ''}
          onChange={(e) => dispatch({ type: 'change', key: 'name', value: e.target.value })}
          error={
            state.errors?.find((err: any) => err.path === 'name')?.message ||
            error?.response?.data.error_message.detail.name
          }
        />
        <BasicInput
          label="フリガナ"
          placeholder="ヤマダ ハナコ"
          name="furigana"
          value={state.input.furigana ?? ''}
          onChange={(e) => dispatch({ type: 'change', key: 'furigana', value: e.target.value })}
          error={
            state.errors?.find((err: any) => err.path === 'furigana')?.message ||
            error?.response?.data.error_message.detail.furigana
          }
        />
        <BasicInput
          label="メールアドレス"
          name="email"
          value={state.input.email ?? ''}
          onChange={(e) => dispatch({ type: 'change', key: 'email', value: e.target.value })}
          error={
            state.errors?.find((err: any) => err.path === 'email')?.message ||
            error?.response?.data.error_message.detail.email
          }
        />
        <div className="sm:grid sm:grid-cols-3 sm:gap-6 mb-3">
          <div className="flex mt-2 mb-2 sm:mb-0 sm:col-span-1">
            <label>性 別</label>
          </div>
          <div className="sm:col-span-2">
            <div className="sm:grid sm:grid-cols-3 sm:gap-2">
              <BasicSelect
                option={Genders}
                style={' col-span-1'}
                name="gender"
                value={state.input.gender ?? 0}
                onChange={(e) => dispatch({ type: 'change', key: 'gender', value: e.target.value })}
                error={
                  state.errors?.find((err: any) => err.path === 'gender')?.message ||
                  error?.response?.data.error_message.detail.gender
                }
              />
              <div className=" col-span-2">
                <InputDate
                  name="birthday"
                  style={' col-span-2'}
                  value={state.input.birthday}
                  onChange={(e) =>
                    dispatch({
                      type: 'change',
                      key: 'birthday',
                      value: formatDateToString(e),
                    })
                  }
                />
              </div>
            </div>
            {state.errors && (
              <p className="text-red-500">
                {state.errors?.find((err: any) => err.path === 'birthday')?.message}
              </p>
            )}
          </div>
        </div>
        <BasicInput
          label="携帯電話番号"
          placeholder="000-0000-0000"
          name="phone"
          value={state.input.phone ?? ''}
          onChange={(e) => dispatch({ type: 'change', key: 'phone', value: e.target.value })}
          error={
            state.errors?.find((err: any) => err.path === 'phone')?.message ||
            error?.response?.data.error_message.detail.phone
          }
        />
        <BasicInput
          label="郵便番号"
          name="post_code"
          value={state.input.post_code ?? ''}
          onChange={(e) => dispatch({ type: 'change', key: 'post_code', value: e.target.value })}
          error={
            state.errors?.find((err: any) => err.path === 'post_code')?.message ||
            error?.response?.data.error_message.detail.post_code
          }
        />
        <BasicInput
          label="住 所"
          name="address"
          value={state.input.address ?? ''}
          onChange={(e) => dispatch({ type: 'change', key: 'address', value: e.target.value })}
          error={
            state.errors?.find((err: any) => err.path === 'address')?.message ||
            error?.response?.data.error_message.detail.address
          }
        />
        <BasicInput
          label="最寄駅"
          name="nearest_station"
          value={state.input.nearest_station ?? ''}
          onChange={(e) =>
            dispatch({ type: 'change', key: 'nearest_station', value: e.target.value })
          }
          error={
            state.errors?.find((err: any) => err.path === 'nearest_station')?.message ||
            error?.response?.data.error_message.detail.nearest_station
          }
        />
      </>
      <>
        <div className="sm:grid sm:grid-cols-3 sm:gap-6 mb-3">
          <div className="flex mt-2 mb-2 sm:mb-0 sm:col-span-1">
            <label>報酬振込先口座</label>
          </div>
          <div className="sm:col-span-2">
            <div className="sm:grid sm:grid-cols-3 sm:gap-2 items-start">
              <BasicInput
                style={' col-span-1'}
                name="bank_name"
                value={state.input.bank_name ?? ''}
                onChange={(e) =>
                  dispatch({ type: 'change', key: 'bank_name', value: e.target.value })
                }
              />
              <BasicInput
                label="銀行"
                style={' col-span-1'}
                name="bank_number"
                value={state.input.bank_number ?? ''}
                onChange={(e) =>
                  dispatch({ type: 'change', key: 'bank_number', value: e.target.value })
                }
              />
              <BasicInput
                label="支店"
                style={' col-span-1'}
                name="brank_branch"
                value={state.input.brank_branch ?? ''}
                onChange={(e) =>
                  dispatch({ type: 'change', key: 'brank_branch', value: e.target.value })
                }
              />
            </div>
            <>
              {state.errors && (
                <>
                  <p className="text-red-500">
                    {state.errors?.find((err: any) => err.path === 'bank_name')?.message}
                  </p>
                  <p className="text-red-500">
                    {state.errors?.find((err: any) => err.path === 'bank_number')?.message}
                  </p>
                  <p className="text-red-500">
                    {state.errors?.find((err: any) => err.path === 'brank_branch')?.message}
                  </p>
                </>
              )}
              {error && (
                <>
                  <p className="text-red-500">
                    {error?.response?.data.error_message.detail.bank_name}
                  </p>
                  <p className="text-red-500">
                    {error?.response?.data.error_message.detail.bank_number}
                  </p>
                  <p className="text-red-500">
                    {error?.response?.data.error_message.detail.brank_branch}
                  </p>
                </>
              )}
            </>
          </div>
        </div>
      </>
      <BasicArea
        label="保育関連経験"
        placeholder="ex. 保育園 3 年、ベビーシッター 1 年 3 か月"
        style=" text-primary-origin"
        name="childcare_experience"
        value={state.input.childcare_experience ?? ''}
        onChange={(e) =>
          dispatch({ type: 'change', key: 'childcare_experience', value: e.target.value })
        }
        error={
          state.errors?.find((err: any) => err.path === 'childcare_experience')?.message ||
          error?.response?.data.error_message.detail.childcare_experience
        }
      />
      <div className="flex flex-col gap-2 mb-3">
        <p className="text-primary-origin py-2">資格・保有スキルなど</p>
        <div className="flex flex-wrap gap-2">
          {listSkillType1 && (
            <BasicCheckboxGroup
              name="skill1"
              label="skill_name"
              data={state.input.skill_ids}
              options={listSkillType1.data.data}
              onChange={(value) =>
                dispatch({
                  type: 'change',
                  key: 'skill_ids',
                  value,
                })
              }
            />
          )}
        </div>
        {error && (
          <span className="text-red-500">
            {state.errors?.find((err: any) => err.path === 'skill_ids')?.message ||
              error?.response?.data.error_message.detail.skill_ids}
          </span>
        )}
        <BasicArea
          name="skill_note_1"
          value={state.input.skill_note_1 ?? ''}
          onChange={(e) => dispatch({ type: 'change', key: 'skill_note_1', value: e.target.value })}
          error={
            state.errors?.find((err: any) => err.path === 'skill_note_1')?.message ||
            error?.response?.data.error_message.detail.skill_note_1
          }
        />
      </div>
      <InputHasNote
        text="キャッチコピー"
        style=" text-primary-origin"
        name="catch_copy"
        value={state.input.catch_copy ?? ''}
        onChange={(e) => dispatch({ type: 'change', key: 'catch_copy', value: e.target.value })}
        error={
          state.errors?.find((err: any) => err.path === 'catch_copy')?.message ||
          error?.response?.data.error_message.detail.catch_copy
        }
      />
      <InputHasNote
        text="自己紹介文(500 文字以上 1000 文字以下)"
        style=" text-primary-origin"
        span="<例文>"
        note="保育可能年齢チェックボックスにする"
        name="about"
        value={state.input.about ?? ''}
        onChange={(e) => dispatch({ type: 'change', key: 'about', value: e.target.value })}
        error={
          state.errors?.find((err: any) => err.path === 'about')?.message ||
          error?.response?.data.error_message.detail.about
        }
        isTextArea
      />
      <div className="mb-3">
        <div className="sm:grid sm:grid-cols-3 sm:gap-6">
          <div className="flex mt-2 mb-2 sm:mb-0 sm:col-span-1">
            <label className=" text-primary-origin">保育可能年齢</label>
          </div>
          <div className="sm:col-span-2">
            <div className="sm:grid sm:grid-cols-3 sm:gap-2">
              {listChildcareAges && (
                <ChildcareAgesSelect
                  option={listChildcareAges.data.data}
                  style={' w-full col-span-1'}
                  name="childcare_age_id"
                  value={state.input.childcare_age_id ?? null}
                  onChange={(e) =>
                    dispatch({ type: 'change', key: 'childcare_age_id', value: e.target.value })
                  }
                />
              )}
            </div>
          </div>
        </div>
        {state.errors && (
          <p className="text-red-500">
            {state.errors?.find((err: any) => err.path === 'childcare_age_id')?.message}
          </p>
        )}
        {error && (
          <p className="text-red-500">
            {error?.response?.data.error_message.detail.childcare_age_id}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 mb-3">
        <p className="text-primary-origin py-2">スキル(講師経験あり/教えることができる)</p>
        <div className="flex flex-wrap gap-2 max-w-[250px]">
          {listSkillType2 && (
            <BasicCheckboxGroup
              name="skill2"
              label="skill_name"
              data={state.input.skill_ids}
              options={listSkillType2.data.data}
              onChange={(value) =>
                dispatch({
                  type: 'change',
                  key: 'skill_ids',
                  value,
                })
              }
            />
          )}
          {error && (
            <span className="text-red-500">
              {state.errors?.find((err: any) => err.path === 'skill_ids')?.message ||
                error?.response?.data.error_message.detail.skill_ids}
            </span>
          )}
        </div>
        <BasicArea
          name="skill_note_2"
          value={state.input.skill_note_2 ?? ''}
          onChange={(e) => dispatch({ type: 'change', key: 'skill_note_2', value: e.target.value })}
          error={
            state.errors?.find((err: any) => err.path === 'skill_note_2')?.message ||
            error?.response?.data.error_message.detail.skill_note_2
          }
        />
      </div>
      <div className="mb-3">
        <div className="sm:grid sm:grid-cols-3 sm:gap-6">
          <div className="flex mt-2 mb-2 sm:mb-0 sm:col-span-1">
            <label>小児・病後児対応</label>
          </div>
          <div className="sm:col-span-2">
            <div className="sm:grid sm:grid-cols-3 sm:gap-2">
              <BasicSelect
                option={IsCan}
                style={' w-full col-span-1'}
                name="postillness_children_support"
                value={state.input.postillness_children_support ?? ''}
                onChange={(e) =>
                  dispatch({
                    type: 'change',
                    key: 'postillness_children_support',
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        {state.errors && (
          <p className="text-red-500">
            {state.errors?.find((err: any) => err.path === 'postillness_children_support')?.message}
          </p>
        )}
        {error && (
          <p className="text-red-500">
            {error?.response?.data.error_message.detail.postillness_children_support}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 mb-3">
        <p className="py-2">病児・病後児対応(可の場合)</p>
        <div className="flex flex-wrap gap-2 max-w-md">
          {listSick && (
            <BasicCheckboxGroup
              name="sick"
              label="sick_name"
              options={listSick.data.data}
              data={state.input.sick_ids}
              onChange={(value) => dispatch({ type: 'change', key: 'sick_ids', value })}
            />
          )}
          {error && (
            <span className="text-red-500">
              {state.errors?.find((err: any) => err.path === 'sick_ids')?.message ||
                error?.response?.data.error_message.detail.sick_ids}
            </span>
          )}
        </div>
      </div>
      <div className="mb-3">
        <div className="sm:grid sm:grid-cols-3 sm:gap-6 ">
          <div className="flex mt-2 mb-2 sm:mb-0 sm:col-span-1">
            <label className=" text-primary-origin py-2">障がい児対応</label>
          </div>
          <div className="sm:col-span-2">
            <div className="sm:grid sm:grid-cols-3 sm:gap-2">
              <BasicSelect
                option={IsCan}
                style={' w-full col-span-1'}
                name="children_disabilities_support"
                value={state.input.children_disabilities_support ?? ''}
                onChange={(e) =>
                  dispatch({
                    type: 'change',
                    key: 'children_disabilities_support',
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        {state.errors && (
          <p className="text-red-500">
            {
              state.errors?.find((err: any) => err.path === 'children_disabilities_support')
                ?.message
            }
          </p>
        )}
        {error && (
          <p className="text-red-500">
            {error?.response?.data.error_message.detail.children_disabilities_support}
          </p>
        )}
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-6 mb-3">
        <div className="flex mt-2 mb-2 sm:mb-0 sm:col-span-1">
          <label className=" text-primary-origin py-2">障がい児対応(経験ありの場合)経験年数</label>
        </div>
        <div className="sm:col-span-2">
          <div className="sm:grid sm:grid-cols-3 sm:gap-2 items-center">
            <BasicInput
              name="children_disabilities_support_years"
              value={state.input.children_disabilities_support_years ?? ''}
              onChange={(e) =>
                dispatch({
                  type: 'change',
                  key: 'children_disabilities_support_years',
                  value: e.target.value,
                })
              }
              error={
                state.errors?.find((err: any) => err.path === 'children_disabilities_support_years')
                  ?.message ||
                error?.response?.data.error_message.detail.children_disabilities_support_years
              }
            />
            <span>年</span>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <p className="py-2">持病やアレルギーがあれば教えてください</p>
        <BasicInput
          name="allergy"
          value={state.input.allergy ?? ''}
          onChange={(e) => dispatch({ type: 'change', key: 'allergy', value: e.target.value })}
          error={
            state.errors?.find((err: any) => err.path === 'allergy')?.message ||
            error?.response?.data.error_message.detail.allergy
          }
        />
      </div>
      <div className="mb-3">
        <p className="py-2">あなたのことを SNS やホームページで紹介してよろしいですか?</p>
        <div className="sm:grid sm:grid-cols-3 sm:gap-2">
          <BasicSelect
            option={YN}
            style={' w-full col-span-1'}
            name="can_publish_sns"
            value={state.input.can_publish_sns ?? ''}
            onChange={(e) =>
              dispatch({ type: 'change', key: 'can_publish_sns', value: e.target.value })
            }
          />
        </div>
        {state.errors && (
          <p className="text-red-500">
            {state.errors?.find((err: any) => err.path === 'can_publish_sns')?.message}
          </p>
        )}
        {error && (
          <p className="text-red-500">
            {error?.response?.data.error_message.detail.can_publish_sns}
          </p>
        )}
      </div>

      <div className="sm:flex sm:justify-center gap-3">
        <BasicCheckbox
          label="プライバシーポリシー 個人情報の取り扱いについて"
          name="isSubmit"
          value={isSubmit}
          onChange={() => setIsSubmit(isSubmit == 0 ? 1 : 0)}
        />
        <ButtonPrimary
          text="登録"
          style=" sm:max-w-[200px] py-2"
          handleClick={handleSubmit}
          disabled={!isSubmit}
        />
      </div>
    </div>
  )
}

Profile.layout = LayoutAuth

Profile.auth = {
  protected: true,
  roles: ['concierge'],
}

export default Profile
