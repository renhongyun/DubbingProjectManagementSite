import hyRequest from '@/service'
import type { INewCarouselImage } from '@/types'

export function getCarouselImageList() {
  return hyRequest.get({
    url: `carousel/list`
  })
}

export function addCarouselImage(newCarosel: INewCarouselImage) {
  return hyRequest.post({
    url: 'carousel/add',
    data: newCarosel
  })
}

export function deleteCarouselImage(id: number) {
  return hyRequest.post({
    url: 'carousel/delete',
    data: { id }
  })
}
