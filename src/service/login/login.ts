import hyRequest from '..'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/user/login',
    data: account
  })
}
// export function accountLoginRequest(account: IAccount) {
//   return hyRequest.post({
//     url: '/login',
//     data: account
//   })
// }
