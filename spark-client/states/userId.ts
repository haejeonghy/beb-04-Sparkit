import { useRecoilState } from 'recoil'
import { userIdState } from './spark'

//로그인시 받아온 accessToken 받아오기
//받아온 accessToken userId로 변환
//RecoilState에 userId넣기
const GetUserId = () => {
  const [userId, setUserId] = useRecoilState(userIdState)
  if (typeof window !== 'undefined') {
    const accessToken = window.sessionStorage.getItem('userInfo')
    if (!accessToken) return
    const settingUserId = (accessToken: string) => {
      const base64 = accessToken.split('.')[1]
      const payload = Buffer.from(base64, 'base64')
      const result = JSON.parse(payload.toString())
      setUserId(Number(result.id))
    }
    settingUserId(accessToken)
  }
}

export default GetUserId
