import { atom } from 'recoil'

// type playlistIdStateType = {
//   key: string
//   default: string
// }

type string_null_undefined = string | null | undefined

export const playlistState = atom<any>({
  key: 'playlistState',
  default: null,
})
export const playlistIdState = atom<string_null_undefined>({
  key: 'playlistIdState',
  default: '7BokM2URofaR4dHSUl1mXG',
})
