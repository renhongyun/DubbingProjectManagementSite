import {
  getAuthorList,
  searchAuthor,
  addAuthor,
  deleteAuthor,
  updateAuthor
} from '@/service/main/author/author'
import { defineStore } from 'pinia'
import type { IAddAuthor, IModifiedAuthor } from '@/types'

interface IAuthorState {
  authorList: any[]
}

const useAuthorStore = defineStore('authorStore', {
  state: (): IAuthorState => ({
    authorList: []
  }),
  actions: {
    async fetchAllAuthorAction() {
      const response = await getAuthorList()
      this.authorList = response.data
    },

    async addAuthorAction(newAuthor: IAddAuthor) {
      await addAuthor(newAuthor)
      this.fetchAllAuthorAction()
    },
    async updateAuthorAction(modifiedAuthor: IModifiedAuthor) {
      const response = await updateAuthor(modifiedAuthor)
      console.log(response)
      this.fetchAllAuthorAction()
    },
    async deleteAuthorAction(id: number) {
      await deleteAuthor(id)
      this.fetchAllAuthorAction()
    },
    async searchAuthorAction(id: number) {
      const response = await searchAuthor(id)

      if (response.data) {
        this.authorList = []
        this.authorList[0] = response.data
      } else {
        this.authorList = []
      }
    }
  }
})

export default useAuthorStore
