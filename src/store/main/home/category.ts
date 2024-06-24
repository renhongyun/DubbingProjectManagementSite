import { getCategories, updateImg } from '@/service/main/home/category'
import { defineStore } from 'pinia'

interface ICategoryState {
  categoryList: any[]
}

const useCategoryStore = defineStore('categoryStore', {
  state: (): ICategoryState => ({
    categoryList: []
  }),
  actions: {
    async fetchAllCategoryAction() {
      const res = await getCategories()
      this.categoryList = res.data
    },
    async updateCategoryImgAction(id: number, img: string) {
      const res = await updateImg(id, img)
      console.log(res)
      this.fetchAllCategoryAction()
    }
  }
})

export default useCategoryStore
