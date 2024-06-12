import { defineStore } from 'pinia'
import { getAllTags, addTags, deleteTags, updateTags } from '@/service/main/tag/tag'
import type { IAddTag, IModifiedTag, IresTags } from '@/types'
interface ITagsState {
  tagsByType: { [key: number]: IresTags[] }
}

const useTagsStore = defineStore('tagsStore', {
  state: (): ITagsState => ({
    tagsByType: {}
  }),
  actions: {
    async fetchAllTagsAction() {
      const response1 = await getAllTags(0)
      this.tagsByType[0] = response1.data

      const response2 = await getAllTags(1)
      this.tagsByType[1] = response2.data
      console.log('类型标签', this.tagsByType[1])

      const response3 = await getAllTags(2)
      this.tagsByType[2] = response3.data
      console.log('语言标签', this.tagsByType[2])

      console.log('标签数据', this.tagsByType)
    },

    async fetchTagsAction(type: number) {
      const response = await getAllTags(type)
      this.tagsByType[type] = response.data
    },
    async addTagsAction(newTag: IAddTag) {
      await addTags(newTag)
      // 添加之后更新
      this.fetchTagsAction(newTag.type)
    },
    async updateTagsAction(modifiedTag: IModifiedTag) {
      await updateTags(modifiedTag)
      this.fetchAllTagsAction()
    },
    async deleteTagsAction(id: number) {
      await deleteTags(id)
      this.fetchAllTagsAction()
    }
  }
})

export default useTagsStore
