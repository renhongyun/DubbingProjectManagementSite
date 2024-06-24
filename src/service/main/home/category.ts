import hyRequest from '@/service'

export function getCategories() {
  return hyRequest.get({
    url: '/firstCategory/getFirstCategory'
  })
}

export function updateImg(id: number, img: string) {
  return hyRequest.post({
    url: '/firstCategory/updateImg',
    data: { id, img }
  })
}
