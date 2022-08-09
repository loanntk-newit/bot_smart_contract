import type { NextPageWithAuth } from 'next'
import { ButtonPrimary } from '../components/Button'
import { useRouter } from 'next/router'
import { BasicInput, BasicSelect, InputDate } from '../components/Form'
import { Genders } from '../stores/Register'
import { useEffect, useReducer } from 'react'
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading/Loading'
import LayoutAuth from '../layouts/LayoutAuth'
import * as yup from 'yup'
import useTitle from '../hooks/useTitle'

const formatDateToString = (date: Date) => {
  if (!date) date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
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
  },
  errors: [],
}

const Register: NextPageWithAuth = () => {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initInputState)

  useTitle('Register')

  const {
    operation: conciergeRegister,
    loading,
    data,
    error,
  } = useAxios('/concierge_register', 'POST', state.input)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let input = {
      name: state.input.name,
      furigana: state.input.furigana,
      birthday: state.input.birthday,
      email: state.input.email,
      gender: state.input.gender,
      phone: state.input.phone,
      post_code: state.input.post_code,
      address: state.input.address,
      nearest_station: state.input.nearest_station,
    }
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
    })

    schema
      .validate(input, { abortEarly: false })
      .then(async () => {
        dispatch({ type: 'clear-validation' })
        await conciergeRegister()
      })
      .catch((err) => {
        console.error(err)
        dispatch({ type: 'validation', errors: err.inner })
      })
  }

  useEffect(() => {
    if (data?.result_code == 'SUCCESS') {
      router.push('/success')
    }
  }, [data])

  return (
    <div className="mx-auto max-w-[940px] py-[40px] sm:py-[80px]">
      {loading && <Loading />}
      <>
        <BasicInput
          label="名 前"
          placeholder="山田 花子"
          name="name"
          value={state.input.name}
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
          value={state.input.furigana}
          onChange={(e) => dispatch({ type: 'change', key: 'furigana', value: e.target.value })}
          error={
            state.errors?.find((err: any) => err.path === 'furigana')?.message ||
            error?.response?.data.error_message.detail.furigana
          }
        />
        <BasicInput
          label="メールアドレス"
          name="email"
          value={state.input.email}
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
                value={state.input.gender}
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
          value={state.input.phone}
          onChange={(e) => dispatch({ type: 'change', key: 'phone', value: e.target.value })}
          error={
            state.errors?.find((err: any) => err.path === 'phone')?.message ||
            error?.response?.data.error_message.detail.phone
          }
        />
        <BasicInput
          label="郵便番号"
          name="post_code"
          value={state.input.post_code}
          onChange={(e) => dispatch({ type: 'change', key: 'post_code', value: e.target.value })}
          error={
            state.errors?.find((err: any) => err.path === 'post_code')?.message ||
            error?.response?.data.error_message.detail.post_code
          }
        />
        <BasicInput
          label="住 所"
          name="address"
          value={state.input.address}
          onChange={(e) => dispatch({ type: 'change', key: 'address', value: e.target.value })}
          error={
            state.errors?.find((err: any) => err.path === 'address')?.message ||
            error?.response?.data.error_message.detail.address
          }
        />
        <BasicInput
          label="最寄駅"
          name="nearest_station"
          value={state.input.nearest_station}
          onChange={(e) =>
            dispatch({ type: 'change', key: 'nearest_station', value: e.target.value })
          }
          error={
            state.errors?.find((err: any) => err.path === 'nearest_station')?.message ||
            error?.response?.data.error_message.detail.nearest_station
          }
        />
      </>

      <div className="w-full px-2 py-4 flex items-center justify-center">
        <ButtonPrimary text={' 面談に申し込む'} handleClick={handleSubmit}></ButtonPrimary>
      </div>
    </div>
  )
}

Register.layout = LayoutAuth

export default Register
