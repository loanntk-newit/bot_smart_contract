import { useEffect } from 'react'

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = document.title = `APP | ${title}` || 'APP'
  }, [title])
}

export default useTitle
