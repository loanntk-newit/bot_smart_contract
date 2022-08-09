import type { NextPageWithAuth } from 'next'
import { ButtonPrimary } from '../components/Button'
import { InputTimeSchedule } from '../components/Form'
import { Calendar } from '../components/Calendars'
import { DateClickArg } from '@fullcalendar/interaction'
import { useCallback, useEffect, useReducer, useState } from 'react'
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading/Loading'
import LayoutAuth from '../layouts/LayoutAuth'
import * as yup from 'yup'
import useTitle from '../hooks/useTitle'
import { EventDate, Shift, Shifts } from '../models/Shifts'
import Link from 'next/link'

const initInputState = {
  input: [
    {
      concierge_id: '',
      date_time: '',
      start_time: '00:00',
      end_time: '00:00',
    },
  ],
  errors: [],
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'refresh-data':
      state.input = { ...action.values }
      return { ...state }
    case 'change':
      state.input[action.step][action.key] = action.value
      return { ...state }
    case 'validation':
      return { ...state, errors: action.errors }
    case 'clear-validation':
      return { ...state, errors: [] }
  }
}

const Schedule: NextPageWithAuth = () => {
  const [state, dispatch] = useReducer(reducer, initInputState)
  const [date, setDate] = useState<string>()
  const [events, setEvents] = useState<EventDate[]>()
  const [err, setErr] = useState<string>()
  const [conciergeId, setConciergeId] = useState<number | null>()

  useTitle('Schedule')

  let formData: Shifts = {
    concierge_id: conciergeId,
    shifts: [],
  }

  const formatDate = (date: string) => {
    let newDate = new Date(date)
    return `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`
  }

  const {
    operation: getUserInfo,
    data: userInfo,
    loading: loadUserInfo,
  } = useAxios('/me', 'GET', null)

  const {
    operation: getDateRegister,
    data: dateRegister,
    loading: loadDateRegister,
  } = useAxios(`/shifts/date-registered`, 'GET', null)

  const { operation: getShifts, data, loading } = useAxios(`/shifts?date=${date}`, 'GET', null)

  const {
    operation: createShifts,
    loading: loadCreateShifts,
    error,
  } = useAxios('/shifts', 'POST', formData)

  const handleDateClick = (e: DateClickArg) => {
    setDate(e.dateStr)
    setErr('')
    const elms = document.querySelectorAll('.fc-daygrid-day')
    const today = document.querySelectorAll('.fc-daygrid-day.fc-day-today')
    elms.forEach((elm: any) => {
      elm.style.backgroundColor = 'transparent'
    })
    today.forEach((elm: any) => {
      elm.style.backgroundColor = 'rgba(255, 220, 40, 0.15)'
    })
    e.dayEl.style.backgroundColor = 'rgb(42 146 227 / 15%)'
  }

  const checkEmptyData = (data: any) => {
    let newData: Shift[] = []
    Object.values(data).map((elm: any) => {
      if (elm.start_time != '00:00' || elm.end_time != '00:00') {
        newData.push(elm)
      }
    })
    return newData
  }

  const handleSubmit = async () => {
    setErr('')
    formData.concierge_id = conciergeId
    formData.shifts = checkEmptyData(state.input)
    let schema = yup.object().shape({
      shifts: yup.array().of(
        yup.object().shape({
          start_time: yup.string().required('開始時刻必須項目です。').label('開始時刻'),
          end_time: yup.string().required('終了時刻必須項目です。').label('終了時刻'),
          date_time: yup.string().required('日付必須項目です。').label('日付'),
        })
      ),
    })

    schema
      .validate(state.input, { abortEarly: false })
      .then(async () => {
        dispatch({ type: 'clear-validation' })
        await createShifts()
        await getShifts()
      })
      .catch((err) => {
        console.error(err)
        dispatch({ type: 'validation', errors: err.inner })
      })
  }

  const handleCreateMore = useCallback(() => {
    let items = []
    let newItem = {
      concierge_id: conciergeId,
      date_time: date,
      id: new Date().getTime(),
      start_time: '00:00',
      end_time: '00:00',
    }
    for (let i = 0; i < Object.keys(state.input).length; i++) {
      items.push(state.input[i])
    }
    items.push(newItem)
    dispatch({ type: 'refresh-data', values: items })
  }, [state.input])

  const handleRemove = useCallback(
    (id: string) => {
      let items = []
      let newItems = Object.values(state.input).filter((el: any) => el.id !== id)
      for (let i = 0; i < newItems.length; i++) {
        items.push(newItems[i])
      }
      dispatch({ type: 'refresh-data', values: items })
    },
    [state.input]
  )

  useEffect(() => {
    const today = new Date().toLocaleDateString('en')
    setDate(formatDate(today))
    getUserInfo()
    getDateRegister()
  }, [])

  useEffect(() => {
    date && getShifts()
  }, [date])

  useEffect(() => {
    if (dateRegister) {
      let data: EventDate[] = []
      dateRegister.data.data.map((d: string) => data.push({ date: d, display: 'background' }))
      setEvents(data)
    }
  }, [dateRegister])

  useEffect(() => {
    if (data) {
      let newItem = {
        concierge_id: conciergeId,
        date_time: date,
        id: new Date().getTime(),
        start_time: '00:00',
        end_time: '00:00',
      }
      dispatch({ type: 'refresh-data', values: [...data.data.data, newItem] })
    }
  }, [data])

  useEffect(() => {
    if (userInfo && userInfo.data.concierge_id) {
      setConciergeId(userInfo.data.concierge_id)
    }
  }, [userInfo])

  useEffect(() => {
    if (error) {
      let key = Object.keys(error.response?.data?.error_message?.detail)[0]
      key && setErr(error.response?.data?.error_message?.detail?.[key])
    }
  }, [error])

  return (
    <div className="mx-auto max-w-[940px] pb-10 sm:py-[80px]">
      {(loading || loadUserInfo || loadCreateShifts || loadDateRegister) && <Loading />}
      <div className="pb-5">
        <Link href="/mypage">
          <span className="font-bold text-primary-origin cursor-pointer underline hover:underline-offset-1">
            マイページに戻る
          </span>
        </Link>
      </div>
      <div className="w-full mb-3">
        <Calendar dateClick={handleDateClick} events={events} />
      </div>
      <p className="py-2">小児・病後児対応</p>
      {state.input &&
        Object.values(state.input).map((data, i) => (
          <InputTimeSchedule
            key={`render-${state.input[i]?.id}`}
            id={state.input[i]?.id ?? 0}
            date={state.input[i]?.date_time ?? ''}
            start_time={state.input[i]?.start_time}
            end_time={state.input[i]?.end_time}
            handleRemove={handleRemove}
            onChangeStartTime={(e) =>
              dispatch({
                type: 'change',
                step: i,
                key: 'start_time',
                value: e?.format('HH:mm') ?? '00:00',
              })
            }
            onChangeEndTime={(e) =>
              dispatch({
                type: 'change',
                step: i,
                key: 'end_time',
                value: e?.format('HH:mm') ?? '00:00',
              })
            }
          />
        ))}

      <div className="mt-3 text-center">
        <ButtonPrimary style=" max-w-fit" text="+" handleClick={handleCreateMore} />
      </div>
      {state.errors && (
        <>
          <div className="text-red-500">
            {state.errors?.find((err: any) => err.path === 'shifts.start_time')?.message}
          </div>
          <div className="text-red-500">
            {state.errors?.find((err: any) => err.path === 'shifts.end_time')?.message}
          </div>
        </>
      )}
      {err && <div className="text-red-500">{err}</div>}

      <div className="mt-3 text-center">
        <ButtonPrimary text="更新" handleClick={handleSubmit} />
      </div>
    </div>
  )
}

Schedule.layout = LayoutAuth

Schedule.auth = {
  protected: true,
  roles: ['concierge'],
  registerStatus: [3],
}

export default Schedule
