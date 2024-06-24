import {
  getCarouselImageList,
  addCarouselImage,
  deleteCarouselImage
} from '@/service/main/home/carousel'
import { defineStore } from 'pinia'
import type { INewCarouselImage } from '@/types'

interface IImageState {
  imageList: any[]
}

const useCarouselStore = defineStore('carouselStore', {
  state: (): IImageState => ({
    imageList: []
  }),
  actions: {
    async fetchCarouselImageListAction() {
      const response = await getCarouselImageList()
      this.imageList = response
      console.log('打印轮播图', this.imageList)
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
