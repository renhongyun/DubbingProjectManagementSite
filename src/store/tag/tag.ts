import { defineStore } from 'pinia'
import { getAllTags, addTags, deleteTags, newTags } from '@/service/main/tag/tag'

interface ITagsState {
  tagsList: any[]
}

const useTagsStore = defineStore('tagsStore', {
  state: (): ITagsState => ({
    tagsList: []
  }),
  actions: {
    async fetchTagsAction(type: number) {
      try {
        const response = await getAllTags(type)
        this.tagsList = response.data
      } catch (error) {
        console.error('Error fetching tags:', error)
      }
    }
  }
})

export default useTagsStore
