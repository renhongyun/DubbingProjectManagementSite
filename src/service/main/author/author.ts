import hyRequest from '@/service'
import type { IAddAuthor, IModifiedAuthor } from '@/types'

export function getAuthorList() {
  return hyRequest.get({
    url: `/dubbingActor/getAll`
  })
}

export function searchAuthor(id: number) {
  return hyRequest.get({
    url: `/dubbingActor/get/${id}`
  })
}

export function addAuthor(newAuthor: IAddAuthor) {
  return hyRequest.post({
    url: '/dubbingActor/add',
    data: newAuthor
  })
}

export function deleteAuthor(id: number) {
  return hyRequest.post({
    url: '/dubbingActor/delete',
    data: { id }
  })
}

export function updateAuthor(modifiedAuthor: IModifiedAuthor) {
  return hyRequest.post({
    url: '/dubbingActor/update',
    data: modifiedAuthor
  })
}
