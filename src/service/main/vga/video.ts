import hyRequest from '@/service'
import type { IUploadVideo, IModifiedVideo } from '@/types'

export function getVideoList() {
  return hyRequest.get({
    url: '/video/all'
  })
}

export function addVideo(newVideo: IUploadVideo) {
  return hyRequest.post({
    url: '/video/add',
    data: newVideo
  })
}

export function deleteVideo(id: number) {
  return hyRequest.post({
    url: '/video/delete',
    data: {
      id
    }
  })
}

export function updateVideo(modifiedVideo: IModifiedVideo) {
  return hyRequest.post({
    url: '/video/update',
    data: modifiedVideo
  })
}
