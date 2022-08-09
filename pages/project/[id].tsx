import type { NextPageWithAuth } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useReducer, useState } from 'react'
import { ButtonPrimary, ButtonUpload } from '../../components/Button'
import { BasicCheckbox, BasicArea, BasicInput, InputDate, InputTime } from '../../components/Form'
import Loading from '../../components/Loading/Loading'
import useAxios from '../../hooks/useAxios'
import useTitle from '../../hooks/useTitle'
import LayoutAuth from '../../layouts/LayoutAuth'
import * as yup from 'yup'
import Link from 'next/link'

const formatDateToString = (date: Date) => {
  if (!date) date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const initInputState = {
  input: {
    project_id: 0,
    concierge_id: 0,
    date_time: formatDateToString(new Date()),
    start_time: '00:00',
    end_time: '00:00',
    traffic_from: '',
    traffic_to: '',
    round_trip: false,
    cost: 0,
    advance_payment: 0,
    content_payment: '',
    receipt_upload_url: '',
    description: '',
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

const Project: NextPageWithAuth = () => {
  const router = useRouter()
  const project_id = router.query.id
  const [state, dispatch] = useReducer(reducer, initInputState)
  const [client, setClient] = useState<string>()
  const [conciergeId, setConciergeId] = useState<number>()
  const [files, setFiles] = useState<any>()
  const [uploadFiles, setUploadFiles] = useState<any>()
  let formData = new FormData()

  useTitle('Project')

  const { operation: me, data: userInfo, loading: loadedMe } = useAxios('/me', 'GET', null)

  const {
    operation: getProject,
    data: projects,
    loading: loadedProject,
  } = useAxios(`/projects/${project_id}`, 'GET', null)

  const {
    operation: putWorkReports,
    loading: loadedWorkReport,
    data: workReports,
    error,
  } = useAxios(`/work_reports/${project_id}`, 'PUT', state.input)

  const {
    operation: uploadMultipleFiles,
    data: dataUploaded,
    loading: loadedUpload,
    error: errorUpload,
  } = useAxios(`/upload_multiple_files`, 'POST', formData)

  useEffect(() => {
    const init = async () => {
      await me()
      await getProject()
    }
    init()
  }, [])

  useEffect(() => {
    userInfo && setConciergeId(userInfo.data.concierge_id)
  }, [userInfo])

  useEffect(() => {
    if (projects) {
      setClient(projects.data?.client?.name)
      let workReport = projects.data.work_report

      if (workReport) {
        dispatch({ type: 'update-info', values: workReport })
        setUploadFiles(projects.data.work_report.receipt_upload_url)
      }
    }
  }, [projects])

  useEffect(() => {
    if (files) {
      let filesName = []
      for (let i = 0; i < files.length; i++) {
        filesName.push(files[i].name)
      }
      setUploadFiles(filesName)
    }
  }, [files])

  useEffect(() => {
    if (dataUploaded) {
      let urls = []
      for (let i = 0; i < dataUploaded.data.url.length; i++) {
        urls.push(dataUploaded.data.url[i])
      }
      state.input.receipt_upload_url = urls[0]
      putWorkReports()
    }
  }, [dataUploaded])

  useEffect(() => {
    if (workReports?.result_code == 'SUCCESS') {
      alert('更新に成功')
      router.push('/mypage')
    }
  }, [workReports])

  const handleSubmit = () => {
    state.input.project_id = project_id
    state.input.concierge_id = conciergeId

    state.input.cost = parseInt(state.input.cost) ? state.input.cost : 0
    state.input.advance_payment = parseInt(state.input.advance_payment)
      ? state.input.advance_payment
      : 0

    let schema = yup.object().shape({
      project_id: yup.string().required('は必須項目です。'),
      concierge_id: yup.string().required('は必須項目です。'),
      date_time: yup.date().required('仕事日時必須項目です').label('仕事日時'),
      start_time: yup.string().required('開始時間必須項目です').label('開始時間'),
      end_time: yup.string().required('終了時間必須項目です').label('終了時間'),
      traffic_from: yup.string().required('駅からは必須項目です。'),
      traffic_to: yup.string().required('駅までは必須項目です。'),
      round_trip: yup.boolean().required('往復必須項目です').label('往復'),
      cost: yup.number().nullable().required('立替金は必須項目です。'),
      advance_payment: yup.number().nullable(),
    })

    schema
      .validate(state.input, { abortEarly: false })
      .then(async () => {
        dispatch({ type: 'clear-validation' })
        if (!!files) {
          handleUploadFiles()
        } else await putWorkReports()
      })
      .catch((err) => {
        dispatch({ type: 'validation', errors: err.inner })
      })
  }

  const handleChangeFile = (event: any) => {
    setFiles(event.target.files)
  }

  const handleUploadFiles = () => {
    if (files) {
      let allowedExts = ['image', 'video', 'pdf']
      let extension = ''
      for (let i = 0; i < files.length; i++) {
        files[i].type.split('/').forEach((val: string) => {
          allowedExts.some((elm) => {
            if (val.includes(elm)) extension = elm
          })
        })

        formData.append(`files[${i}]`, files[i])
      }
      formData.append('type', extension)
      formData.append('folder_name', 'upload')
      uploadMultipleFiles()
    }
  }

  return (
    <div className="mx-auto max-w-[940px] pb-10 sm:py-[80px]">
      {(loadedMe || loadedProject || loadedWorkReport || loadedUpload) && <Loading />}
      <div className="pb-5">
        <Link href="/mypage">
          <span className="font-bold text-primary-origin cursor-pointer underline hover:underline-offset-1">
            マイページに戻る
          </span>
        </Link>
      </div>
      <div className="sm:grid sm:grid-cols-6 sm:gap-6 mb-3">
        <div className="flex mt-2 mb-2 sm:mb-0 sm:col-span-1">
          <label className="py-2">プロジェクト No</label>
        </div>
        <div className="sm:col-span-5">
          <div className="sm:grid sm:grid-cols-5 gap-2 items-center ">
            <div className="sm:col-span-3">
              <BasicInput value={projects?.data.project_code ?? ''} disabled />
            </div>
            <div className="sm:col-span-2 mb-3">
              <span>クライアント: {client}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="sm:grid sm:grid-cols-6 sm:gap-6">
          <div className="flex mt-2 mb-2 sm:mb-0 sm:col-span-1">
            <label className="py-2">仕事日時</label>
          </div>
          <div className="sm:col-span-5">
            <div className="sm:grid sm:grid-cols-5 gap-2 items-center ">
              <div className="sm:col-span-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-3">
                    <InputDate
                      name="date_time"
                      value={state.input.date_time}
                      onChange={(e) =>
                        dispatch({
                          type: 'change',
                          key: 'date_time',
                          value: formatDateToString(e),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2 flex gap-2 items-center justify-between">
                <InputTime
                  name="start_time"
                  placeholder="00:00"
                  value={state.input.start_time}
                  minuteStep={5}
                  onChange={(e) =>
                    dispatch({
                      type: 'change',
                      key: 'start_time',
                      value: e?.format('HH:mm') ?? '00:00',
                    })
                  }
                />
                <span className="mb-3">~</span>
                <InputTime
                  name="end_time"
                  placeholder="00:00"
                  value={state.input.end_time}
                  minuteStep={5}
                  onChange={(e) =>
                    dispatch({
                      type: 'change',
                      key: 'end_time',
                      value: e?.format('HH:mm') ?? '00:00',
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {state.errors && (
          <>
            <p className="text-red-500">
              {state.errors?.find((err: any) => err.path === 'date_time')?.message}
            </p>
            <p className="text-red-500">
              {state.errors?.find((err: any) => err.path === 'start_time')?.message}
            </p>
            <p className="text-red-500">
              {state.errors?.find((err: any) => err.path === 'end_time')?.message}
            </p>
          </>
        )}
        {error && (
          <>
            <p className="text-red-500">{error?.response?.data.error_message?.detail?.date_time}</p>
            <p className="text-red-500">
              {error?.response?.data.error_message?.detail?.start_time}
            </p>
            <p className="text-red-500">{error?.response?.data.error_message?.detail?.end_time}</p>
          </>
        )}
      </div>

      <div className="mb-3">
        <div className="sm:grid sm:grid-cols-6 sm:gap-6">
          <div className="flex mt-2 mb-2 sm:mb-0 sm:col-span-1">
            <label className="py-2">交 通</label>
          </div>
          <div className="sm:col-span-5">
            <div className="sm:grid sm:grid-cols-5 gap-2 items-center ">
              <div className="sm:col-span-3 flex gap-2 items-center justify-between">
                <BasicInput
                  name="traffic_from"
                  placeholder="新宿"
                  value={state.input.traffic_from ?? ''}
                  onChange={(e) =>
                    dispatch({
                      type: 'change',
                      key: 'traffic_from',
                      value: e.target.value,
                    })
                  }
                />
                <span className="mb-3">~</span>
                <BasicInput
                  name="traffic_to"
                  placeholder="下北沢"
                  value={state.input.traffic_to ?? ''}
                  onChange={(e) =>
                    dispatch({
                      type: 'change',
                      key: 'traffic_to',
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <div className="sm:col-span-1 sm:flex justify-center">
                <BasicCheckbox
                  name="round_trip"
                  label="往復"
                  value={state.input.round_trip}
                  onChange={(e) =>
                    dispatch({
                      type: 'change',
                      key: 'round_trip',
                      value: e.target.value == 'false' ? true : false,
                    })
                  }
                />
              </div>
              <div className="flex w-full items-center sm:col-span-1 gap-2 ">
                <BasicInput
                  name="cost"
                  type="number"
                  placeholder="600"
                  value={state.input.cost}
                  onChange={(e) =>
                    dispatch({
                      type: 'change',
                      key: 'cost',
                      value: e.target.value,
                    })
                  }
                />
                <span className="mb-3">円</span>
              </div>
            </div>
          </div>
        </div>
        {state.errors && (
          <>
            <p className="text-red-500">
              {state.errors?.find((err: any) => err.path === 'traffic_from')?.message}
            </p>
            <p className="text-red-500">
              {state.errors?.find((err: any) => err.path === 'traffic_to')?.message}
            </p>
            <p className="text-red-500">
              {state.errors?.find((err: any) => err.path === 'round_trip')?.message}
            </p>
            <p className="text-red-500">
              {state.errors?.find((err: any) => err.path === 'cost')?.message}
            </p>
          </>
        )}
        {error && (
          <>
            <p className="text-red-500">
              {error?.response?.data.error_message?.detail?.traffic_from}
            </p>
            <p className="text-red-500">
              {error?.response?.data.error_message?.detail?.traffic_to}
            </p>
            <p className="text-red-500">
              {error?.response?.data.error_message?.detail?.round_trip}
            </p>
            <p className="text-red-500">{error?.response?.data.error_message?.detail?.cost}</p>
          </>
        )}
      </div>

      <div className="mb-3">
        <div className="sm:grid sm:grid-cols-6 sm:gap-6 ">
          <div className="flex mt-2 mb-2 sm:mb-0 sm:col-span-1">
            <label className="py-2">立替金</label>
          </div>
          <div className="sm:col-span-5">
            <div className="sm:grid sm:grid-cols-5 gap-2 items-center">
              <div className="flex items-center sm:col-span-1 gap-2 ">
                <BasicInput
                  name="advance_payment"
                  type="number"
                  placeholder="000"
                  value={state.input.advance_payment}
                  onChange={(e) =>
                    dispatch({
                      type: 'change',
                      key: 'advance_payment',
                      value: parseInt(e.target.value),
                    })
                  }
                />
                <span className="mb-3">円</span>
              </div>
              <div className="sm:col-span-2">
                <BasicInput
                  name="content_payment"
                  label="立替金内容"
                  placeholder="買い物代行"
                  value={state.input.content_payment ?? ''}
                  onChange={(e) =>
                    dispatch({
                      type: 'change',
                      key: 'content_payment',
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <ButtonUpload
                  text={uploadFiles?.length > 0 ? `１ファイル` : '立替レシートアップロード'}
                  style={`${uploadFiles?.length > 0 ? ' bg-gray-300' : null} py-2 mb-3`}
                  accept="image/*, video/*, application/pdf"
                  handleChangeFile={handleChangeFile}
                />
              </div>
            </div>
          </div>
        </div>
        {state.errors && (
          <p className="text-red-500">
            {state.errors?.find((err: any) => err.path === 'advance_payment')?.message}
          </p>
        )}
        {error && (
          <>
            <p className="text-red-500">
              {error?.response?.data.error_message?.detail?.advance_payment}
            </p>
            <p className="text-red-500">
              {error?.response?.data.error_message?.detail?.content_payment}
            </p>
            <p className="text-red-500">
              {error?.response?.data.error_message?.detail?.receipt_upload_url}
            </p>
          </>
        )}
        {errorUpload && (
          <p className="text-red-500">
            {errorUpload?.response?.data.error_message?.detail?.files ??
              errorUpload?.response?.data.error_message?.detail?.type}
          </p>
        )}
      </div>

      {/* <ButtonWhite text="追加" style=" sm:max-w-[110px] py-2 mb-3" handleClick={handleSubmit} /> */}
      <div className="mb-3">
        <BasicArea
          name="description"
          row={4}
          value={state.input.description ?? ''}
          onChange={(e) =>
            dispatch({
              type: 'change',
              key: 'description',
              value: e.target.value,
            })
          }
          error={
            state.errors?.find((err: any) => err.path === 'description')?.message ||
            error?.response?.data.error_message?.detail?.description
          }
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
        {/* <ButtonPrimary text="一時保存" style=" sm:max-w-[200px] py-2" handleClick={handleSubmit} /> */}
        <ButtonPrimary text="報告する" style=" sm:max-w-[200px] py-2" handleClick={handleSubmit} />
      </div>
    </div>
  )
}

Project.layout = LayoutAuth

Project.auth = {
  protected: true,
  roles: ['concierge'],
  registerStatus: [3],
}

export default Project
