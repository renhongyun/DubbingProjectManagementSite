import hyRequest from '@/service'

export function getAllCategory() {
  return hyRequest.get({
    url: '/firstCategory/all'
  })
}
