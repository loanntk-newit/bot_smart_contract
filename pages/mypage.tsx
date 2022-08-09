import type { NextPageWithAuth } from 'next'
import Link from 'next/link'
import { ButtonPrimary } from '../components/Button'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading/Loading'
import { ProjectsByConcierge } from '../models/Concierge'
import LayoutAuth from '../layouts/LayoutAuth'
import useTitle from '../hooks/useTitle'

const MyPage: NextPageWithAuth = () => {
  const router = useRouter()
  const [conciergeId, setConciergeId] = useState<number | null>()
  useTitle('My Page')

  const {
    operation: getUserInfo,
    data: userInfo,
    loading: loadUserInfo,
  } = useAxios('/me', 'GET', null)

  const {
    operation: getProject,
    data: projectsByConcierge,
    loading: loadProject,
  } = useAxios(`/projects_by_concierge_id/${conciergeId}`, 'GET', null)

  const formatDateTimeJP = (date: string) => {
    let newDate = new Date(date)
    return `${newDate.getFullYear()}年${newDate.getMonth() + 1}月${newDate.getDate()}日 ${newDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}`
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    if (userInfo && userInfo.data.concierge_id) {
      setConciergeId(userInfo.data.concierge_id)
    }
  }, [userInfo])

  useEffect(() => {
    if (conciergeId) {
      getProject()
    }
  }, [conciergeId])

  return (
    <>
      {loadUserInfo && <Loading />}
      {loadProject && <Loading />}
      <div className="mx-auto max-w-[940px] py-10">
        <h1 className="font-bold text-center text-[32px] mb-3">マイページ</h1>

        <div className="flex justify-between">
          <p className="font-bold text-[20px]">基本情報</p>
          <ButtonPrimary
            text={'編集'}
            style=" max-w-[70px] py-2"
            handleClick={() => router.push('/profile')}
          />
        </div>
        <hr className="mt-1" />

        <div className="px-0 lg:px-36 py-3">
          <p>{userInfo?.data.name}</p>
          <p className="pt-3">{userInfo?.data.email}</p>
        </div>

        <div className="py-20 ">
          <Link href="/schedule">
            <span className="text-primary-origin cursor-pointer underline hover:underline-offset font-bold text-[20px]">
              シフト入力へ
            </span>
          </Link>
        </div>

        <p className="font-bold text-[20px]">シフト入ったプロジェクト</p>

        <hr className="my-2" />

        <div className="px-0 py-8 ">
          {projectsByConcierge &&
            projectsByConcierge.data.total != 0 &&
            projectsByConcierge.data.data.map((elm: ProjectsByConcierge, i: number) => (
              <div className="sm:grid sm:grid-cols-5 gap-x-8 text-[20px]" key={i}>
                <Link href={`/project/${elm.project_id}`} className="sm:col-span-2">
                  <p className="sm:col-span-2 text-primary-origin underline py-2 sm:py-4 cursor-pointer">
                    プロジェクトNo .{elm.project_code}
                  </p>
                </Link>
                <p className="sm:col-span-3 py-2 sm:py-4">
                  {elm.start_date && formatDateTimeJP(elm.start_date)} ~{' '}
                  {elm.end_date && formatDateTimeJP(elm.end_date)}
                </p>
              </div>
            ))}
          {(!projectsByConcierge || projectsByConcierge.data.total == 0) && <p>データなし</p>}
        </div>
      </div>
    </>
  )
}

MyPage.layout = LayoutAuth

MyPage.auth = {
  protected: true,
  roles: ['concierge'],
  registerStatus: [3],
}

export default MyPage
