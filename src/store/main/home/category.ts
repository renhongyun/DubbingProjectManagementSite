import { getAllCategory } from '@/service/main/home/category'
import { defineStore } from 'pinia'
// import useMainStore from '../main'
// import type { ISystemState } from './type'

interface ICategoryState {
  categoryList: any[]
}

const useCategoryStore = defineStore('categoryStore', {
  state: (): ICategoryState => ({
    categoryList: []
  }),
  actions: {
    fetchAllCategoryAction() {
      getAllCategory().then((res) => {
        this.categoryList = res.data
      })
    }
  }
})

export default useCategoryStore
