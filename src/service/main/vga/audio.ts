import hyRequest from '@/service'
import type { IAudio, IUploadAudio, IModifiedAudio } from '@/types'

export function getAudioList(audioData: IAudio) {
  return hyRequest.post({
    url: '/audio/list',
    data: audioData
  })
}

export function addAudio(newAudio: IUploadAudio) {
  return hyRequest.post({
    url: '/audio/add',
    data: newAudio
  })
}

export function deleteAudio(id: number) {
  return hyRequest.post({
    url: '/audio/delete',
    data: {
      id
    }
  })
}

export function updateAudio(modifiedAudio: IModifiedAudio) {
  return hyRequest.post({
    url: '/audio/update',
    data: modifiedAudio
  })
}
