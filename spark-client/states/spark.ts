import { atom } from 'recoil'
import { GetPosts } from '../types/spark'

export const postsState = atom<GetPosts[]>({
  key: 'postsState',
  default: [],
})

export const userIdState = atom<number>({
  key: 'userIdState',
  default: 0,
})
