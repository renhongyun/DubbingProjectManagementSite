import hyRequest from '..'
import type {} from '@/types'

// export function accountLoginRequest(file: ) {
//   return hyRequest.post({
//     url: '/file/upload',
//     data:
//   })
// }

export function uploadFile(file: any, biz: any) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('biz', biz)

  return hyRequest.post({
    url: '/file/upload',
    data: formData
  })
}
