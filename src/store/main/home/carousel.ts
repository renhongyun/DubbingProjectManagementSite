import {
  getCarouselImageList,
  addCarouselImage,
  deleteCarouselImage
} from '@/service/main/home/carousel'
import { defineStore } from 'pinia'
import type { INewCarouselImage } from '@/types'

interface IAudioState {
  imageList: any[]
}

const useCarouselStore = defineStore('carouselStore', {
  state: (): IAudioState => ({
    imageList: []
  }),
  actions: {
    async fetchCarouselImageListAction() {
      const response = await getCarouselImageList()
      this.imageList = response.data
    },
    async addCarouselImageAction(newImage: INewCarouselImage) {
      const response = await addCarouselImage(newImage)
      console.log(response)
      this.fetchCarouselImageListAction()
    },
    async deleteCarouselImageAction(id: number) {
      const response = await deleteCarouselImage(id)
      console.log(response)
      this.fetchCarouselImageListAction()
    }
  }
})

export default useCarouselStore
