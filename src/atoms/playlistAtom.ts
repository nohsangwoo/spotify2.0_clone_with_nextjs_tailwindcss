import { atom } from 'recoil'

// type playlistIdStateType = {
//   key: string
//   default: string
// }
export const playlistIdState = atom<string | undefined | null>({
  key: 'playlistIdState',
  default: '7BokM2URofaR4dHSUl1mXG',
})
