import hyRequest from '@/service'
import type { IAddTag, IModifiedTag } from '@/types'

export function getAllTags(type: number) {
  return hyRequest.get({
    url: `/tags/list/${type}`
  })
}

export function addTags(newTags: IAddTag) {
  return hyRequest.post({
    url: '/tags/add',
    data: newTags
  })
}

export function deleteTags(id: number) {
  return hyRequest.post({
    url: '/tags/delete',
    data: { id }
  })
}

export function updateTags(modifiedTag: IModifiedTag) {
  return hyRequest.post({
    url: '/tags/update',
    data: modifiedTag
  })
}
